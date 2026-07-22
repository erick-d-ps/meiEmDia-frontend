"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { Accountant, FormActionState } from "@/lib/types";

export type AccountantActionState = FormActionState & {
  data?: Accountant;
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

export async function saveAccountantAction(
  initialAccountant: Accountant | null,
  prevState: AccountantActionState | null,
  formData: FormData,
): Promise<AccountantActionState> {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Sua sessao expirou. Faca login novamente.",
        data: prevState?.data,
      };
    }

    const existingAccountant = initialAccountant ?? prevState?.data;
    const name = getFieldValue(formData, "name");
    const email = getFieldValue(formData, "email");
    const phone = onlyDigits(getFieldValue(formData, "phone"));

    if (name.length < 3) {
      return {
        success: false,
        error: "Informe um nome valido para o contador.",
        data: prevState?.data,
      };
    }

    if (!email) {
      return {
        success: false,
        error: "Informe um e-mail para o contador.",
        data: prevState?.data,
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Informe um e-mail valido.",
        data: prevState?.data,
      };
    }

    if (phone.length < 10 || phone.length > 11) {
      return {
        success: false,
        error: "Informe um telefone valido com DDD e número.",
        data: prevState?.data,
      };
    }

    const isEditing = Boolean(existingAccountant);
    const accountant = await apiClient<Accountant>("/accountant", {
      method: isEditing ? "PUT" : "POST",
      token,
      body: JSON.stringify({ name, email, phone }),
    });

    return {
      success: true,
      error: "",
      message: isEditing
        ? "Dados do contador atualizados com sucesso."
        : "Dados do contador salvos com sucesso.",
      data: accountant,
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
            error: error.message ?? "Nao foi possivel salvar os dados do contador.",
            data: prevState?.data,
          };
        }
      } catch {
        return {
          success: false,
          error: "Nao foi possivel salvar os dados do contador.",
          data: prevState?.data,
        };
      }
    }

    return {
      success: false,
      error: "Erro ao salvar os dados do contador.",
      data: prevState?.data,
    };
  }
}

export async function getAccountant(): Promise<Accountant | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    return await apiClient<Accountant>("/accountant", {
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

        if (
          error.status === 400 &&
          /contador.*n(?:a|ã)o encontrado/i.test(error.message ?? "")
        ) {
          return null;
        }
      } catch {
        
      }
    }

    throw err;
  }
}