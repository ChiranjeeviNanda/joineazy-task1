/**
 * AdminDashboardPage
 *
 * Main dashboard for Admin users. It provides:
 * - A summary of system-wide metrics (assignments, students, submissions).
 * - A personalized list of assignments created by the logged-in admin.
 * - Modals for creating assignments, reviewing submissions, and viewing assignment details.
 */

import { useMemo, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

// Admin Components Imports
import CreateAssignmentModal from "../components/admin/CreateAssignmentModal";
import SubmissionReviewModal from "../components/admin/SubmissionReviewModal";

// Common Components Imports
import AssignmentCard from "../components/common/AssignmentCard";
import AssignmentDetailsModal from "../components/common/AssignmentDetailsModal";

// Icons Imports
import {
	ClipboardList,
	PlusCircle,
	Users,
	Send,
	FileText,
	LayoutDashboard,
	X,
} from "lucide-react";

const AdminDashboardPage = () => {
	const { currentUser, assignments, submissions, allUsers } = useAppContext();

	/** Modal States */
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [reviewModalState, setReviewModalState] = useState({
		isOpen: false,
		assignmentId: null,
	});
	const [detailsModalState, setDetailsModalState] = useState({
		isOpen: false,
		assignment: null,
	});

	/** Modal Handlers */
	const handleOpenCreateModal = () => setIsCreateModalOpen(true);
	const handleOpenReviewModal = (assignmentId) =>
		setReviewModalState({ isOpen: true, assignmentId });
	const handleCloseReviewModal = () =>
		setReviewModalState({ isOpen: false, assignmentId: null });
	const handleOpenDetailsModal = (assignment) =>
		setDetailsModalState({ isOpen: true, assignment });
	const handleCloseDetailsModal = () =>
		setDetailsModalState({ isOpen: false, assignment: null });

	/** Data Calculations */
	const studentCount = useMemo(
		() => allUsers.filter((u) => u.role === "student").length,
		[allUsers]
	);

	const totalAssignments = assignments.length;

	const totalSubmitted = useMemo(() => {
		return submissions.filter((sub) => sub.isSubmitted).length;
	}, [submissions]);

	const adminAssignments = useMemo(() => {
		return assignments.filter((a) => a.adminId === currentUser.id);
	}, [assignments, currentUser.id]);

	/**
	 * Returns submission statistics for a specific assignment:
	 * - totalStudents: total number of registered students.
	 * - submittedCount: how many have submitted for this assignment.
	 */
	const getSubmissionSummary = (assignmentId) => {
		const totalStudents = studentCount;
		const submittedCount = submissions.filter(
			(sub) => sub.assignmentId === assignmentId && sub.isSubmitted
		).length;
		return { totalStudents, submittedCount };
	};

	return (
		<div className="min-h-screen p-4 sm:p-8">
			<div className="max-w-7xl mx-auto space-y-8 pt-20 sm:pt-12">
				{/* 1. Dashboard Header */}
				<header className="p-6 sm:p-8 backdrop-blur-sm rounded-2xl shadow-xl border border-base-content/25">
					<div className="flex items-center space-x-4 mb-2">
						<LayoutDashboard className="size-8 sm:size-10 text-primary" />
						<h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
							Welcome, {currentUser.name}!
						</h1>
					</div>
					<p className="text-base-content/70 text-sm sm:text-lg ml-12 sm:ml-14">
						Ready to review submissions? Today is{" "}
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

				{/* 2. Global Status Summary */}
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
						<div className="stat-desc text-base-content/50">
							Created across all Admins
						</div>
					</div>

					<div className="stat p-4 sm:p-6">
						<div className="stat-figure text-warning">
							<Users className="size-6 sm:size-8" />
						</div>
						<div className="stat-title font-semibold text-base sm:text-lg">
							Registered Students
						</div>
						<div className="stat-value text-3xl sm:text-4xl">
							{studentCount}
						</div>
						<div className="stat-desc text-base-content/50">
							Total users who can submit
						</div>
					</div>

					<div className="stat p-4 sm:p-6">
						<div className="stat-figure text-success">
							<Send className="size-6 sm:size-8" />
						</div>
						<div className="stat-title font-semibold text-base sm:text-lg">
							Submissions Logged
						</div>
						<div className="stat-value text-3xl sm:text-4xl">
							{totalSubmitted}
						</div>
						<div className="stat-desc text-base-content/50">
							Total submission confirmations received
						</div>
					</div>
				</div>

				{/* 3. Section Title + Create Button */}
				<div className="flex flex-col sm:flex-row justify-between items-center pb-2 border-b border-base-content/25">
					<h2 className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
						<ClipboardList className="w-7 h-7 mr-3" /> My Assignment List
						<span className="badge badge-lg badge-primary ml-4">
							{adminAssignments.length}
						</span>
					</h2>
					<button
						onClick={handleOpenCreateModal}
						className="btn btn-primary font-semibold m-4 sm:m-0"
					>
						<PlusCircle className="w-5 h-5" /> Create New Assignment
					</button>
				</div>

				{/* 4. Assignment Grid */}
				{adminAssignments.length === 0 ? (
					<div className="text-center p-10 bg-base-100 rounded-xl shadow-lg text-base-content/70">
						<span className="text-lg">
							You have not created any assignments yet. Click{" "}
							<p className="font-bold">Create New Assignment</p> above to publish
							your first task!
						</span>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{adminAssignments.map((assignment) => {
							const summary = getSubmissionSummary(assignment.id);

							return (
								<AssignmentCard
									key={assignment.id}
									role="admin"
									assignment={assignment}
									summary={summary}
									openReviewModal={handleOpenReviewModal}
									openDetailsModal={handleOpenDetailsModal}
								/>
							);
						})}
					</div>
				)}

				{/* 5. Modal Layer */}
				<CreateAssignmentModal
					isOpen={isCreateModalOpen}
					onClose={() => setIsCreateModalOpen(false)}
				/>
				<SubmissionReviewModal
					modalState={reviewModalState}
					handleCloseModal={handleCloseReviewModal}
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

export default AdminDashboardPage;
