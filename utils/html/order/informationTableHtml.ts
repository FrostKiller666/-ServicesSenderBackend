export const informationTableHtml = (information: string[], show: boolean): string => {
    let informationBody = "";
    let informationIndex = 0;

    information.forEach(information => {
        informationBody += `
            <p>
                ${++informationIndex}) 
                ${
                information
                }
            </p>
        `;
    })

    if(show) {
        return `
                <hr>
                <table style="border-width: 1px; border-color: black; border-style: dashed; width: 100%"> 
                    <thead><strong>Informacje dla zamawiającego:</strong></thead>
                        <tbody>
                        ${
                            informationBody
                        }
                        </tbody>
                </table>
        `
    }
    return ``
}
