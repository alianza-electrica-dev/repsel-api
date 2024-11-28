export const querySearch = (repselGroup: number, priceList: number): string => {
  const query = `
      SELECT
        ItemCode AS sku,
        Price AS precio,
        Price AS precio_comparacion,
        CASE
          WHEN ISNULL(Currency, '') = '' THEN 'MXN'
          ELSE Currency
        END AS moneda
      FROM
        ITM1
      WHERE
        PriceList = ${priceList}
        AND ItemCode IN (
          SELECT
            ItemCode
          FROM
            OITM
          WHERE
            QryGroup${repselGroup} IN ('Y')
        )
    `;
  return query;
};
