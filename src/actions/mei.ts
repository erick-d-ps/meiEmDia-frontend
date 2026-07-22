"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { ActivityType, FormActionState, Mei } from "@/lib/types";

export type MeiActionState = FormActionState & {
  data?: Mei;
};

function getFieldValue(
  formData: FormData,
  fieldName: string,
  fallbackValue = "",
) {
  if (!formData.has(fieldName)) {
    return fallbackValue.trim();
  }

  return String(formData.get(fieldName) ?? "").trim();
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isActivityType(value: string): value is ActivityType {
  return value === "SERVICO" || value === "COMERCIO" || value === "MISTO";
}

export async function saveMeiAction(
  initialMei: Mei | null,
  prevState: MeiActionState | null,
  formData: FormData,
): Promise<MeiActionState> {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Sua sessao expirou. Faca login novamente.",
        data: prevState?.data,
      };
    }

    const existingMei = initialMei ?? prevState?.data;
    const activityType = getFieldValue(
      formData,
      "activityType",
      existingMei?.activityType,
    );
    const hasAccountantValue = getFieldValue(
      formData,
      "hasAccountant",
      existingMei ? String(existingMei.hasAccountant) : "",
    );

    if (!isActivityType(activityType)) {
      return {
        success: false,
        error: "Selecione um tipo de atividade valido.",
        data: prevState?.data,
      };
    }

    if (hasAccountantValue !== "true" && hasAccountantValue !== "false") {
      return {
        success: false,
        error: "Informe se o MEI possui contador.",
        data: prevState?.data,
      };
    }

    const data = {
      cnpj: onlyDigits(getFieldValue(formData, "cnpj", existingMei?.cnpj)),
      companyName: getFieldValue(formData, "companyName", existingMei?.companyName),
      fantasyName: getFieldValue(formData, "fantasyName", existingMei?.fantasyName),
      ownerName: getFieldValue(formData, "ownerName", existingMei?.ownerName),
      cpf: onlyDigits(getFieldValue(formData, "cpf", existingMei?.cpf)),
      state: getFieldValue(formData, "state", existingMei?.state).toUpperCase(),
      city: getFieldValue(formData, "city", existingMei?.city),
      mainActivityCNAE: getFieldValue(
        formData,
        "mainActivityCNAE",
        existingMei?.mainActivityCNAE,
      ),
      activityType,
      hasAccountant: hasAccountantValue === "true",
    };

    if (data.cnpj.length < 14) {
      return { success: false, error: "Informe um CNPJ valido.", data: prevState?.data };
    }

    if (data.companyName.length < 3) {
      return { success: false, error: "Informe uma razao social valida.", data: prevState?.data };
    }

    if (data.fantasyName && data.fantasyName.length < 3) {
      return { success: false, error: "O nome fantasia deve ter ao menos 3 caracteres.", data: prevState?.data };
    }

    if (data.ownerName.length < 3) {
      return { success: false, error: "Informe um nome de titular valido.", data: prevState?.data };
    }

    if (data.cpf.length < 11) {
      return { success: false, error: "Informe um CPF valido.", data: prevState?.data };
    }

    if (data.state.length !== 2) {
      return { success: false, error: "O estado deve conter 2 caracteres.", data: prevState?.data };
    }

    if (data.city.length < 2) {
      return { success: false, error: "Informe uma cidade valida.", data: prevState?.data };
    }

    if (data.mainActivityCNAE.length < 4) {
      return { success: false, error: "Informe um CNAE principal valido.", data: prevState?.data };
    }

    const isEditing = Boolean(existingMei?.id);
    const mei = await apiClient<Mei>("/mei", {
      method: isEditing ? "PUT" : "POST",
      token,
      body: JSON.stringify(data),
    });

    return {
      success: true,
      error: "",
      message: isEditing
        ? "Dados do MEI atualizados com sucesso."
        : "Dados do MEI salvos com sucesso.",
      data: mei,
    };
  } catch (err) {
    if (err instanceof Error) {
      try {
        const error = JSON.parse(err.message) as {
          message?: string;
          status?: number;
        };

        if (error.status === 401) {
          return {
            success: false,
            error: "Sua sessao expirou. Faca login novamente.",
            data: prevState?.data,
          };
        }

        if (error.status === 400) {
          return {
            success: false,
            error: error.message ?? "Nao foi possivel salvar os dados do MEI.",
            data: prevState?.data,
          };
        }
      } catch {
        return {
          success: false,
          error: "Nao foi possivel salvar os dados do MEI.",
          data: prevState?.data,
        };
      }
    }

    return {
      success: false,
      error: "Erro ao salvar os dados do MEI.",
      data: prevState?.data,
    };
  }
}

export async function getMei(): Promise<Mei | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    return await apiClient<Mei>("/mei", {
      method: "GET",
      token,
      cache: "no-store",
    });
  } catch (err) {
    if (err instanceof Error) {
      try {
        const error = JSON.parse(err.message) as {
          message?: string;
          status?: number;
        };

        // Neste endpoint, o backend usa 400 quando o usuario ainda nao possui
        // um MEI. Isso faz parte do fluxo normal do primeiro cadastro.
        if (error.status === 400) {
          return null;
        }
      } catch {
        // O erro original sera relancado abaixo.
      }
    }

    throw err;
  }
}
