export const config = {
  runtime: 'edge', // ISSO garante o redirecionamento ultra rápido na borda
};

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Captura todos os parâmetros da URL (ex: ?utm_source=fb&utm_campaign=vn...)
  const queryString = req.url.split('?')[1] || '';
  const { utm_campaign } = req.query;

  const pageWhite = "https://casadasspanelas.shop/shopee/presell-ml/";
  const pageBlack = "https://cheerful-bloom-box.lovable.app/";

  // Filtros de Segurança
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const isFacebook = /facebookexternalhit|Facebot|FBAN|FBAV/i.test(userAgent);
  const hasVn = utm_campaign && utm_campaign.includes('rwv');

  // Lógica de Redirecionamento e senha
  if (isFacebook || !isMobile || !hasVn) {
    // Para a White, geralmente não passamos parâmetros para evitar "sujeira" no rastro
    return res.redirect(302, pageWhite);
  }

  // Para a Black, anexamos os parâmetros originais para não perder o rastreio
  const finalDestination = queryString ? ⁠ ${pageBlack}?${queryString} ⁠ : pageBlack;

  return res.redirect(302, finalDestination);
}
