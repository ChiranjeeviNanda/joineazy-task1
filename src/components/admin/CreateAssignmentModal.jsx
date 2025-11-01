/**
 * Modal component allowing an Admin to create new assignments.
 * Includes validation, field grouping, and context integration to update the global state.
 */

import React, { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { FileText, Calendar, Link, PlusCircle, X, Info } from "lucide-react";
import FormInput from "../common/FormInput";

const CreateAssignmentModal = ({ isOpen, onClose }) => {
	const { currentUser, setAssignments } = useAppContext();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		dueDate: "",
		driveLink: "",
	});

	/** Handles input field changes and updates local form data state. */
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	/** Validates and adds the new assignment to global state, then closes the modal. */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formData.title || !formData.dueDate || !formData.driveLink) {
			alert(
				"Please fill in all required fields (Title, Due Date, Drive Link)."
			);
			return;
		}

		const newAssignment = {
			id: `a${Date.now()}`,
			adminId: currentUser.id,
			...formData,
		};

		setAssignments((prevAssignments) => [
			...prevAssignments,
			newAssignment,
		]);
		setFormData({ title: "", description: "", dueDate: "", driveLink: "" });
		alert(`Assignment "${newAssignment.title}" created successfully!`);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div
			className="modal modal-open flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="modal-box bg-base-100 shadow-2xl border border-base-content/25 rounded-2xl max-w-2xl relative transition-all duration-300"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button (Top Right) */}
				<button
					onClick={onClose}
					className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-primary hover:bg-primary/10 transition-all duration-150"
					aria-label="Close modal"
				>
					<X className="size-5" />
				</button>

				{/* Header */}
				<h2 className="font-bold text-2xl mb-2 text-primary border-b pb-3 border-base-content/25 flex items-center">
					Create New Assignment
				</h2>

					{/* Assignment Creation Form */}
				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					{/* Title */}
					<FormInput
						id="title"
						label="Assignment Title"
						type="text"
						value={formData.title}
						onChange={handleChange}
						placeholder="e.g., Final Project Proposal"
						Icon={FileText}
						required
					/>

					{/* Due Date */}
					<FormInput
						id="dueDate"
						label="Due Date"
						type="date"
						value={formData.dueDate}
						onChange={handleChange}
						Icon={Calendar}
						required
					/>

					{/* Drive Link */}
					<FormInput
						id="driveLink"
						label="Assignment Drive Link"
						type="url"
						value={formData.driveLink}
						onChange={handleChange}
						placeholder="https://drive.google.com/..."
						Icon={Link}
						required
					/>

					{/* Description */}
					<FormInput
						id="description"
						label="Description"
						as="textarea"
						value={formData.description}
						onChange={handleChange}
						placeholder="Provide any additional instructions or context for the assignment..."
					/>

					<p className="text-sm text-base-content/50 flex items-center">
						<Info className="size-4 mr-1.5" />
						Fields marked with an asterisk (*) are required.
					</p>

					{/* Action buttons */}
					<div className="modal-action mt-4 pt-4 border-t border-base-content/25 flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="btn btn-ghost"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary font-bold"
						>
							<PlusCircle className="size-5 mr-1" />
							Create Assignment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateAssignmentModal;
