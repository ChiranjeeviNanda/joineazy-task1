/**
 * Modal component allowing an Admin to review assignment submissions.
 * Includes table view of status of each student's submission.
 */

import { useMemo } from "react";
import { useAppContext } from "../../hooks/useAppContext";

// Component Imports
import StudentProgressRow from "./StudentProgressRow";

// Icon Imports
import { X, Users, Send } from "lucide-react";

const SubmissionReviewModal = ({ modalState, handleCloseModal }) => {
    // Get data from context
    const { assignments, submissions, allUsers } = useAppContext();

    // Logic matching AssignmentDetailsModal
    if (!modalState.isOpen || !modalState.assignmentId) return null;

    const assignment = assignments.find(
        (a) => a.id === modalState.assignmentId
    );
    if (!assignment) return null;

    // Prepare data for student submission statuses
    const studentStatuses = useMemo(() => {
        const students = allUsers.filter((u) => u.role === "student");

        return students.map((student) => {
            const submission = submissions.find(
                (sub) =>
                    sub.studentId === student.id &&
                    sub.assignmentId === modalState.assignmentId
            );

            const isSubmitted = submission?.isSubmitted || false;

            // Status object
            const status = {
                isSubmitted: isSubmitted,
                statusText: isSubmitted ? "Submitted" : "Pending",
            };

            return {
                studentId: student.id,
                studentName: student.name,
                status: status,
            };
        });
    }, [allUsers, submissions, modalState.assignmentId]);

    const submittedCount = studentStatuses.filter(
        (s) => s.status.isSubmitted
    ).length;
    const totalStudents = studentStatuses.length;

    const progressPercentage =
        totalStudents > 0
            ? Math.round((submittedCount / totalStudents) * 100)
            : 0;

    return (
        <div
            className="modal modal-open flex items-center justify-center p-4"
            role="dialog"
            onClick={handleCloseModal}
        >
            <div
                className="modal-box bg-base-100 shadow-2xl border border-base-content/25 rounded-2xl max-w-4xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button (Top Right) */}
                <button
                    onClick={handleCloseModal}
                    className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-primary hover:bg-primary/10 transition duration-150"
                    aria-label="Close modal"
                >
                    <X className="size-5" />
                </button>

                <h1
                    className="font-bold text-2xl mb-4 text-primary border-b pb-2 border-base-300 pr-10 overflow-hidden whitespace-nowrap truncate"
                    title={`Reviewing: ${assignment.title}`}
                >
                    Submission Review: {assignment.title}
                </h1>

                {/* Summary Stats */}
                <div className="stats stats-vertical md:stats-horizontal shadow w-full rounded-2xl border border-base-content/20 bg-base-100/90 mb-6">
                    <div className="stat p-4 sm:p-6">
                        <div className="stat-figure text-warning">
                            <Users className="size-6 sm:size-8" />
                        </div>
                        <div className="stat-title font-semibold text-base sm:text-lg">
                            Total Students
                        </div>
                        <div className="stat-value text-warning">
                            {totalStudents}
                        </div>
                    </div>
                    <div className="stat p-4 sm:p-6">
                        <div className="stat-figure text-success">
                            <Send className="size-6 sm:size-8" />
                        </div>
                        <div className="stat-title font-semibold text-base sm:text-lg">
                            Submissions Received
                        </div>
                        <div className="stat-value text-success">
                            {submittedCount}
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

                {/* Submission Table */}
                <h2 className="text-xl font-bold mb-3 text-base-content/90">
                    Individual Student Status
                </h2>
                <div className="overflow-x-auto max-h-[50vh] overflow-y-auto custom-scrollbar border border-base-content/25 rounded-lg">
                    <table className="table w-full bg-base-100">
                        <thead>
                            <tr className="bg-base-200 sticky top-0 shadow-md">
                                <th className="text-base-content/90 font-bold py-3 w-[5%]"> {/* New Index Column */}
                                    #
                                </th>
                                <th className="text-base-content/90 font-bold py-3 w-auto">
                                    Student Name
                                </th>
                                <th className="text-base-content/90 font-bold py-3 w-[15%] text-center"> {/* STATUS - closer to Action */}
                                    Status
                                </th>
                                <th className="text-base-content/90 font-bold py-3 w-[20%] text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentStatuses.map((data, index) => (
                                <StudentProgressRow
                                    key={data.studentId}
                                    studentName={data.studentName}
                                    submissionStatus={data.status}
                                    assignmentDriveLink={assignment.driveLink}
                                    index={index}
                                />
                            ))}
                            {/* Fallback for no students */}
                            {totalStudents === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-base-content/70">
                                        No students found in the roster.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Action Button */}
                <div className="modal-action mt-6">
                    <button
                        onClick={handleCloseModal}
                        className="btn btn-primary"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmissionReviewModal;