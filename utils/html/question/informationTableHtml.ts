export const informationTableHtml = (information: string, show: boolean): string => {
    if(show === true) {
        return `
                <hr>
                <table style="border-width: 1px; border-color: black; border-style: dashed; width: 100%"> 
                    <thead><strong>Informacje dla zamawiającego:</strong></thead>
                        <tbody>
                            <p>${information}</p>
                        </tbody>
                </table>
        `
    }
    return ``
}
