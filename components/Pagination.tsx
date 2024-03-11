type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (value: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { page, pageSize, totalItems, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 disabled:border disabled:border-gray-300 disabled:bg-white disabled:text-gray-400 rounded"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 disabled:border disabled:border-gray-300 disabled:bg-white disabled:text-gray-400 rounded"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
}
