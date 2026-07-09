"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { ActivityType, FormActionState, Mei } from "@/lib/types";

function getFieldValue(formData: FormData, fieldName: string) {
  return String(formData.get(fieldName) ?? "").trim();
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isActivityType(value: string): value is ActivityType {
  return value === "SERVICO" || value === "COMERCIO" || value === "MISTO";
}

export async function saveMeiAction(
  prevState: FormActionState | null,
  formData: FormData,
): Promise<FormActionState> {
  void prevState;

  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Sua sessao expirou. Faca login novamente.",
      };
    }

    const activityType = getFieldValue(formData, "activityType");

    if (!isActivityType(activityType)) {
      return {
        success: false,
        error: "Selecione um tipo de atividade valido.",
      };
    }

    const data = {
      cnpj: onlyDigits(getFieldValue(formData, "cnpj")),
      companyName: getFieldValue(formData, "companyName"),
      fantasyName: getFieldValue(formData, "fantasyName"),
      ownerName: getFieldValue(formData, "ownerName"),
      cpf: onlyDigits(getFieldValue(formData, "cpf")),
      state: getFieldValue(formData, "state").toUpperCase(),
      city: getFieldValue(formData, "city"),
      mainActivityCNAE: onlyDigits(getFieldValue(formData, "mainActivityCNAE")),
      activityType,
      hasAccountant: getFieldValue(formData, "hasAccountant") === "true",
    };

    await apiClient<Mei>("/mei", {
      method: "POST",
      token,
      body: JSON.stringify(data),
    });

    return {
      success: true,
      error: "",
      message: "Dados do MEI salvos com sucesso.",
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
          };
        }

        if (error.status === 400) {
          return {
            success: false,
            error: error.message ?? "Nao foi possivel salvar os dados do MEI.",
          };
        }
      } catch {
        return {
          success: false,
          error: "Nao foi possivel salvar os dados do MEI.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao salvar os dados do MEI.",
    };
  }
}
