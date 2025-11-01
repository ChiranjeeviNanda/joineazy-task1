/**
 * Modal component displaying full details of a selected assignment.
 * Designed for both students and admins to view comprehensive information.
 */

// Icon Imports
import { Calendar, User, FileText, X } from "lucide-react";

const AssignmentDetailsModal = ({ isOpen, onClose, assignment }) => {
	// Prevent rendering if modal is not open or assignment data is missing
	if (!isOpen || !assignment) return null;

	return (
		<div
			className="modal modal-open flex items-center justify-center p-4"
			onClick={onClose}
		>
			{/* Modal content area */}
			<div
				className="modal-box bg-base-100 shadow-2xl border border-base-content/25 rounded-xl max-w-2xl relative"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
			>
				{/* Close Button (Top Right) */}
				<button
					onClick={onClose}
					className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-primary hover:bg-primary/10 transition duration-150"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Header */}
				<h3
					className="font-bold text-2xl mb-4 text-primary border-b pb-2 border-base-content/25 pr-10 overflow-hidden whitespace-nowrap truncate"
					title={`${assignment.title} Details`}
				>
					{assignment.title}
				</h3>

				{/* Metadata Section */}
				<div className="flex flex-col text-sm text-base-content/80 mt-2 space-y-2 mb-4">
					{/* Due Date */}
					<div className="flex items-center">
						<Calendar className="w-4 h-4 mr-2 text-warning" />
						<p className="font-semibold text-base-content">
							Due: {assignment.dueDate}
						</p>
					</div>

					{/* Assigned By */}
					<div className="flex items-center">
						<User className="w-4 h-4 mr-2 text-warning" />
						<p className="text-base-content/90">
							Assigned by:{" "}
							<span className="font-medium">
								{assignment.adminName || "You"}
							</span>
						</p>
					</div>
				</div>

				{/* Description Section */}
				<div className="mt-4">
					<div className="flex items-center mb-2 text-base font-semibold text-base-content/70">
						<FileText className="w-5 h-5 mr-2" /> Description
					</div>

					<p className="text-base-content/90 text-sm p-4 bg-base-200 rounded-lg border border-base-content/25 max-h-60 overflow-y-auto custom-scrollbar">
						{assignment.description ||
							"No description provided for this assignment."}
					</p>
				</div>

				{/* Close Button */}
				<div className="modal-action mt-6">
					<button onClick={onClose} className="btn btn-primary">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default AssignmentDetailsModal;
