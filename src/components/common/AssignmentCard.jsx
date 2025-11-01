/**
 * Reusable card component that displays assignment information
 * for both students and admins, adapting its layout and
 * available actions based on the provided `role`.
 */

// Icon Imports
import {
	Calendar,
	Users,
	FileText,
	UploadCloud,
	CheckCircle,
	Check,
	User,
} from "lucide-react";

const AssignmentCard = ({
	assignment,
	role,
	studentSubmission,
	summary,
	openSubmissionModal,
	openReviewModal,
	openDetailsModal,
}) => {
	// Student Status Logic
	const isSubmitted =
		role === "student" ? studentSubmission?.isSubmitted || false : false;
	const studentStatusText = isSubmitted ? "Submitted" : "Pending";
	const studentStatusClass = isSubmitted ? "badge-success" : "badge-warning";

	// Admin Progress Logic
	const { totalStudents = 0, submittedCount = 0 } = summary || {};
	const completionRate =
		totalStudents > 0
			? Math.round((submittedCount / totalStudents) * 100)
			: 0;
	const isPastDue = new Date(assignment.dueDate) < new Date();
	const isCompleted = completionRate === 100;

	return (
		<div className="card w-full shadow-xl border border-base-content/20 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 rounded-2xl flex flex-col">
			<div className="card-body p-6 flex flex-col justify-between h-full">
				{/* Header */}
				<div>
					<h2 className="card-title text-2xl font-bold text-primary flex justify-between items-center mb-1">
						{assignment.title}

						{/* Role-specific status badge */}
						{role === "student" && (
							<div
								className={`badge ${studentStatusClass} font-bold text-xs p-3`}
							>
								{studentStatusText}
							</div>
						)}

						{role === "admin" && (
							<div className="flex items-center">
								{isCompleted ? (
									<div className="badge badge-success font-bold text-xs p-3">
										Complete
									</div>
								) : isPastDue ? (
									<div className="badge badge-error font-bold text-xs p-3">
										Overdue
									</div>
								) : (
									<div className="badge badge-info font-bold text-xs p-3">
										Ongoing
									</div>
								)}
							</div>
						)}
					</h2>

					{/* Metadata */}
					<div className="flex flex-col text-sm text-base-content/80 mt-2 space-y-2 border-b border-base-content/30 pb-3">
						{/* Due Date */}
						<div className="flex items-center">
							<Calendar
								className={`size-4 mr-2 ${
									role === "student"
										? "text-warning"
										: isPastDue && !isSubmitted
										? "text-error"
										: "text-success"
								}`}
							/>
							<p
								className={`font-semibold ${
									role === "student"
										? "text-base-content"
										: isPastDue && !isSubmitted
										? "text-error"
										: "text-success"
								}`}
							>
								Due: {assignment.dueDate}
							</p>
						</div>

						{/* Assigned By (Student view only) */}
						{role === "student" && (
							<div className="flex items-center">
								<User className="size-4 mr-2 text-warning" />
								<p className="text-base-content/90">
									Assigned by: {assignment.adminName}
								</p>
							</div>
						)}
					</div>

					{/* Details Button */}
					<div className="mt-2">
						<button
							onClick={() => openDetailsModal(assignment)}
							className="btn btn-ghost btn-sm text-primary p-0 h-auto"
							aria-label={`View details for ${assignment.title}`}
						>
							<FileText className="size-4 mr-1" /> View Details
						</button>
					</div>

					{/* Progress Bar (Admin view only) */}
					{role === "admin" && (
						<div className="mt-4">
							<p className="text-base font-semibold text-base-content">
								Submissions:
								<span
									className={`ml-2 text-xl ${
										completionRate === 0
											? "text-warning"
											: "text-success"
									}`}
								>
									{submittedCount}
								</span>
								<span className="text-base-content/60">
									{" "}
									/ {totalStudents}
								</span>
							</p>
							<progress
								className={`progress ${
									isCompleted
										? "progress-success"
										: completionRate > 0
										? "progress-primary"
										: "progress-warning"
								} w-full`}
								value={completionRate}
								max="100"
							></progress>
							<p className="text-right text-xs text-base-content/60">
								{completionRate}% total
							</p>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="card-actions justify-end space-x-2 mt-4">
					{role === "student" ? (
						<>
							{/* Upload Button */}
							<a
								href={assignment.driveLink}
								target="_blank"
								rel="noopener noreferrer"
								className={`btn btn-sm ${
									isSubmitted ? "btn-disabled" : "btn-soft"
								}`}
								disabled={isSubmitted}
							>
								<UploadCloud className="size-4" />
								{isSubmitted ? "File Uploaded" : "Upload File"}
							</a>

							{/* Confirm Submission Button */}
							<button
								onClick={() =>
									openSubmissionModal(assignment.id)
								}
								className={`btn btn-sm ${
									isSubmitted ? "btn-success" : "btn-primary"
								}`}
								disabled={isSubmitted}
							>
								{isSubmitted ? (
									<>
										<CheckCircle className="size-4" />{" "}
										Completed
									</>
								) : (
									<>
										<Check className="size-4" /> Confirm
										Submission
									</>
								)}
							</button>
						</>
					) : (
						/* Review Submissions (Admin view only) */
						<button
							onClick={() => openReviewModal(assignment.id)}
							className="btn btn-primary btn-block font-semibold"
						>
							<Users className="size-5" /> Review Submissions
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AssignmentCard;
