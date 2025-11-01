/**
 * Displays all assignments available to the logged-in student, their completion progress,
 * and provides interactive modals for viewing assignment details or submitting work.
 */

import { useState, useMemo } from "react";
import { useAppContext } from "../hooks/useAppContext";

// Component Imports
import AssignmentCard from "../components/common/AssignmentCard";
import SubmissionModal from "../components/student/SubmissionModal";
import AssignmentDetailsModal from "../components/common/AssignmentDetailsModal";

// Icon Imports
import {
	CheckCircle,
	ClipboardList,
	Clock,
	FileText,
	LayoutDashboard,
} from "lucide-react";

const StudentDashboardPage = () => {
	const { currentUser, assignments, submissions, setSubmissions, allUsers } =
		useAppContext();

	// State for Submission Modal
	const [submissionModalState, setSubmissionModalState] = useState({
		isOpen: false,
		assignmentId: null,
	});

	// State for Assignment Details Modal
	const [detailsModalState, setDetailsModalState] = useState({
		isOpen: false,
		assignment: null,
	});

	/**
	 * Computes and enhances assignment data for the current student.
	 * Adds submission info and associated admin name for context.
	 * Memoized for performance.
	 */
	const studentAssignments = useMemo(() => {
		const enhancedAssignments = assignments.map((assignment) => {
			const studentSubmission = submissions.find(
				(sub) =>
					sub.studentId === currentUser.id &&
					sub.assignmentId === assignment.id
			);

			const admin = allUsers.find((u) => u.id === assignment.adminId);
			const adminName = admin ? admin.name : "Unknown Admin";

			return {
				...assignment,
				submission: studentSubmission,
				adminName,
			};
		});

		// Sort (descending by ID as a placeholder for latest/due order)
		return enhancedAssignments.sort((a, b) => b.id - a.id);
	}, [assignments, submissions, currentUser.id, allUsers]);

	// Statistics & derived data
	const totalAssignments = studentAssignments.length;
	const completedAssignments = studentAssignments.filter(
		(a) => a.submission?.isSubmitted
	).length;
	const pendingAssignments = totalAssignments - completedAssignments;

	const progressPercentage =
		totalAssignments > 0
			? Math.round((completedAssignments / totalAssignments) * 100)
			: 0;

	/** Modal Handlers */
	const handleOpenSubmissionModal = (assignmentId) =>
		setSubmissionModalState({ isOpen: true, assignmentId });
	const handleCloseSubmissionModal = () =>
		setSubmissionModalState({ isOpen: false, assignmentId: null });

	const handleOpenDetailsModal = (assignment) =>
		setDetailsModalState({ isOpen: true, assignment });
	const handleCloseDetailsModal = () =>
		setDetailsModalState({ isOpen: false, assignment: null });

	return (
		<div className="min-h-screen p-4 sm:p-8">
			<div className="max-w-7xl mx-auto space-y-8 pt-20 sm:pt-12">
				{/* 1. Header */}
				<header className="p-6 sm:p-8 backdrop-blur-sm rounded-2xl shadow-xl border border-base-content/25">
					<div className="flex items-center space-x-4 mb-2">
						<LayoutDashboard className="size-8 sm:size-10 text-primary" />
						<h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
							Welcome, {currentUser.name}!
						</h1>
					</div>
					<p className="text-base-content/70 text-sm sm:text-lg ml-12 sm:ml-14">
						Ready to check your assignments? Today is{" "}
						<span className="font-semibold text-base-content">
							{new Date().toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
						.
					</p>
				</header>

				{/* 2. Stats and Progress */}
				<div className="stats stats-vertical md:stats-horizontal shadow w-full rounded-2xl border border-base-content/20 bg-base-100/90">
					<div className="stat p-4 sm:p-6">
						<div className="stat-figure text-primary">
							<FileText className="size-6 sm:size-8" />
						</div>
						<div className="stat-title font-semibold text-base sm:text-lg">
							Total Assignments
						</div>
						<div className="stat-value text-3xl sm:text-4xl">
							{totalAssignments}
						</div>
					</div>

					<div className="stat p-4 sm:p-6">
						<div className="stat-figure text-success">
							<CheckCircle className="size-6 sm:size-8" />
						</div>
						<div className="stat-title font-semibold text-base sm:text-lg">
							Completed
						</div>
						<div className="stat-value text-success text-3xl sm:text-4xl">
							{completedAssignments}
						</div>
					</div>

					<div className="stat p-4 sm:p-6">
						<div className="stat-figure text-warning">
							<Clock className="size-6 sm:size-8" />
						</div>
						<div className="stat-title font-semibold text-base sm:text-lg">
							Pending
						</div>
						<div className="stat-value text-warning text-3xl sm:text-4xl">
							{pendingAssignments}
						</div>
					</div>

					<div className="stat p-4 sm:p-6">
						<div className="stat-title font-semibold text-base sm:text-lg">
							Overall Progress
						</div>
						<div className="stat-value text-3xl sm:text-4xl font-extrabold">
							{progressPercentage}%
						</div>
						<progress
							className="progress progress-primary w-full mt-2"
							value={progressPercentage}
							max="100"
						></progress>
					</div>
				</div>

				{/* 3. Assignment List */}
				<h2 className="text-2xl sm:text-3xl font-bold border-b border-base-content/25 pb-2 text-primary flex items-center">
					<ClipboardList className="w-7 h-7 mr-3" />
					Your Assignment List
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{studentAssignments.map((a) => (
						<AssignmentCard
							key={a.id}
							role="student"
							assignment={a}
							studentSubmission={a.submission}
							openSubmissionModal={handleOpenSubmissionModal}
							openDetailsModal={handleOpenDetailsModal}
						/>
					))}

					{totalAssignments === 0 && (
						<div className="col-span-full text-center p-8 bg-base-200/50 rounded-lg text-base-content/60 border border-base-content/10">
							No assignments have been published yet. Check back
							soon!
						</div>
					)}
				</div>

				{/* 4. Modals */}
				<SubmissionModal
					modalState={submissionModalState}
					handleCloseModal={handleCloseSubmissionModal}
				/>

				<AssignmentDetailsModal
					isOpen={detailsModalState.isOpen}
					onClose={handleCloseDetailsModal}
					assignment={detailsModalState.assignment}
				/>
			</div>
		</div>
	);
};

export default StudentDashboardPage;
