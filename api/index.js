export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // Captura os parâmetros da URL de forma eficiente
  const utmCampaign = url.searchParams.get('utm_campaign') || '';
  const queryString = url.search; // Mantém o ? e todos os parâmetros

  const pageWhite = "https://casadasspanelas.shop/shopee/presell-ml/";
  const pageBlack = "https://cheerful-bloom-box.lovable.app/";

  // Filtros de Segurança
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const isFacebook = /facebookexternalhit|Facebot|FBAN|FBAV/i.test(userAgent);
  
  // Verificação da UTM (ajustei para 'rwv' conforme seu código novo)
  const hasVn = utmCampaign.includes('rwv');

  // Lógica de Redirecionamento
  if (isFacebook || !isMobile || !hasVn) {
    // Redireciona para White (sem parâmetros para limpar rastro)
    return Response.redirect(pageWhite, 302);
  }

  // Redireciona para Black mantendo TODAS as UTMs originais
  const finalDestination = `${pageBlack}${queryString}`;
  
  return Response.redirect(finalDestination, 302);
}
