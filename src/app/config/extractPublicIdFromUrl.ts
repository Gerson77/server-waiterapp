/**
 * Função auxiliar para extrair o public_id da URL do Cloudinary.
 * @param url - A URL completa da imagem hospedada no Cloudinary.
 * @returns O public_id extraído ou null se não for possível extrair.
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Divide a URL em partes usando '/'
    const parts = url.split("/");

    // Encontra o índice da parte 'upload' para identificar o início do caminho da imagem
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) {
      console.error("Formato de URL inválido: 'upload' não encontrado.");
      return null;
    }

    // Pega as partes após 'upload' até a última parte (nome do arquivo)
    const pathParts = parts.slice(uploadIndex + 2); // Ignora 'vXXXXXX' (versão)

    // Remove a extensão do arquivo
    const fileName = pathParts.pop()?.split(".")[0];
    if (!fileName) {
      console.error("Nome de arquivo inválido na URL.");
      return null;
    }

    // Combina as partes restantes para formar o public_id
    const publicId = [...pathParts, fileName].join("/");
    return publicId;
  } catch (error) {
    console.error("Erro ao extrair public_id da URL:", error);
    return null;
  }
}
