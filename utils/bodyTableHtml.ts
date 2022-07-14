export const bodyTableHtml = (model: string, part: string, quality: string, price: string, guarantee: string, color?: string ): string => {
    let bodyTableHtml = "";
    for (let i = 0; i < 1; i++) {
        bodyTableHtml = bodyTableHtml + ` 
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${model}</td>
                <td>${part}</td>
                <td>${color}</td>
                <td>${quality}</td>
                <td>${price}</td>
                <td>${guarantee}</td>             
            </tr>`
    }
    return bodyTableHtml;
}
