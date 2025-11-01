/**
 * Modal component for confirming a student's final assignment submission.
 * Offers two-step confirmation logic.
 */

import { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { AlertTriangle, CheckCircle, X } from "lucide-react";

const SubmissionModal = ({ modalState, handleCloseModal }) => {
	const { currentUser, setSubmissions, assignments } = useAppContext();

	// Tracks whether confirmation step is active (always true for this single-step flow)
	const [isConfirming, setIsConfirming] = useState(false);

	// When the modal opens or closes, reset confirmation state accordingly
	useEffect(() => {
		if (modalState.isOpen) {
			setIsConfirming(true);
		} else {
			setIsConfirming(false);
		}
	}, [modalState.isOpen]);

	// Retrieve assignment title for display
	const assignment = assignments.find(
		(a) => a.id === modalState.assignmentId
	);
	const assignmentTitle = assignment ? assignment.title : "Assignment";

	/**
	 * Final confirmation handler.
	 * Updates the submission list in global context with a confirmed entry.
	 * If a record for the same student and assignment already exists, it is overwritten.
	 */
	const handleFinalConfirmation = () => {
		if (modalState.assignmentId) {
			setSubmissions((prevSubs) => {
				const newSubmission = {
					assignmentId: modalState.assignmentId,
					studentId: currentUser.id,
					isSubmitted: true,
					submissionDate: new Date().toISOString().slice(0, 10),
				};

				const existingIndex = prevSubs.findIndex(
					(sub) =>
						sub.assignmentId === newSubmission.assignmentId &&
						sub.studentId === newSubmission.studentId
				);

				if (existingIndex > -1) {
					const updatedSubs = [...prevSubs];
					updatedSubs[existingIndex] = newSubmission;
					return updatedSubs;
				}

				return [...prevSubs, newSubmission];
			});
		}
		handleCloseModal();
	};

	// Prevent rendering if modal is closed
	if (!modalState.isOpen) return null;

	return (
		<div
			className="modal modal-open flex items-center justify-center p-4"
			role="dialog"
			onClick={handleCloseModal}
		>
			{/* Modal content container */}
			<div
				className="modal-box bg-base-100 shadow-2xl border border-primary/20 rounded-2xl max-w-lg relative"
				onClick={(e) => e.stopPropagation()} // Prevent accidental close when clicking inside
			>
				{/* Close Button (Top Right) */}
				<button
					onClick={handleCloseModal}
					className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-primary hover:bg-primary/10 transition duration-150"
					aria-label="Close modal"
				>
					<X className="size-5" />
				</button>

				{/* Header */}
				<h3 className="font-bold text-2xl mb-4 text-primary border-b pb-2 border-base-300">
					Final Submission: {assignmentTitle}
				</h3>

				{/* Confirmation Step */}
				{isConfirming && (
					<>
						{/* Warning Banner */}
						<div
							role="alert"
							className="alert alert-error text-error-content font-semibold"
						>
							<AlertTriangle className="size-5" />
							<span>
								This action is permanent and logs your
								submission status.
							</span>
						</div>

						{/* Instruction Text */}
						<p className="py-4 font-semibold text-base text-base-content">
							Clicking "Confirm Submission" finalizes your status
							that you have uploaded your file to the designated
							Drive link. Are you absolutely sure you are ready to
							submit?
						</p>

						{/* Action Buttons */}
						<div className="modal-action">
							{/* Confirm Button */}
							<button
								onClick={handleFinalConfirmation}
								className="btn btn-success"
							>
								<CheckCircle className="size-5" /> Confirm
								Submission
							</button>

							{/* Cancel Button */}
							<button
								onClick={handleCloseModal}
								className="btn btn-ghost"
							>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SubmissionModal;
