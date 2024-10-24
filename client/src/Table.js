
import './table.css';

function Table({ data }) {
   

    return (
        <div className="table-component">     
            <table data-table-theme="default zebra">
                <thead>
                    <tr>
                        <th>Район</th>
                        <th>Количество мест</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.District}</td>
                            <td>{item.Capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           

           
        </div>
    );
}

export default Table;
