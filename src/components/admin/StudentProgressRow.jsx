/** Renders a single row in the review table.
 *  Displays student name, submission status, and action link.
 */
const StudentProgressRow = ({
    studentName,
    submissionStatus,
    assignmentDriveLink,
    index,
}) => {
    const { isSubmitted, statusText } = submissionStatus;

    return (
        <tr className="bg-base-100 hover:bg-base-200">
            {/* Index Column */}
            <td className="font-semibold text-base-content/70">{index + 1}</td> 

            {/* Student Name Column */}
            <td className="font-medium text-base-content/90">{studentName}</td>

            {/* Status Column */}
            <td className="flex justify-center">
                <div
                    className={`badge font-bold text-xs p-3 ${
                        isSubmitted ? "badge-success" : "badge-warning"
                    }`}
                >
                    {statusText}
                </div>
            </td>

            {/* Action Column */}
            <td className="text-center"> 
                <a
                    href={assignmentDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-sm ${isSubmitted ? "btn-primary" : "btn-ghost"}`}
                    disabled={!isSubmitted}
                    title={isSubmitted ? "Open assignment folder in Drive" : "No submission link available"}
                >
                    {isSubmitted ? "Review" : "N/A"}
                </a>
            </td>
        </tr>
    );
};

export default StudentProgressRow;