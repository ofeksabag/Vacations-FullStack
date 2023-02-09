import "./Pagination.css";

interface paginationProps {
    totalVacations: number;
    vacationsPerPage: number;
    paginatePages: (number: number) => void;
}

function Pagination(props: paginationProps): JSX.Element {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalVacations / props.vacationsPerPage); i++) pageNumbers.push(i);

    return (
        <div className="Pagination">
            {
                pageNumbers.map(num => (
                    <button key={num} onClick={() => props.paginatePages(num)} className="PaginationButton">
                        {num}
                    </button>
                ))
            }
        </div>
    );
}

export default Pagination;
