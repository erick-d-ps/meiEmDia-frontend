const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;
  cache?: "no-store" | "force-cache";
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // adiciona token caso exista
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  // tratamento de erro
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Erro HTTP: " + response.status,
    }));

    throw new Error(error.error ?? "Erro desconhecido");
  }

  return response.json();
}
