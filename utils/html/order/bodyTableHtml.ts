
export const newBodyTableHtml = (values: any): any => {
    let bodyTableHtml = "";
    let index = 0;

    values.forEach((value: any) => {
        bodyTableHtml +=  ` 
        <tr>
            <th scope="row">${++index}</th>
            <td>${value.model}</td>
            <td>${value.part}</td>
            <td>${value.color}</td>
            <td>${value.quality}</td>
            <td>${value.price}</td>
            <td>${value.guarantee}</td>             
        </tr>`
    })

    return bodyTableHtml;
}
