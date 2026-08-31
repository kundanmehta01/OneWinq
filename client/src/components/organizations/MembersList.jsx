import { Button, Empty } from "../common/UI.jsx";
import MemberCard from "./MemberCard.jsx";

export default function MembersList({
  members,
  pagination,
  page,
  onPageChange,
  canManage,
  busyId,
  onChangeRole,
  onRemove,
}) {
  if (!members.length) {
    return <Empty>No members found for this organization.</Empty>;
  }
  return (
    <div className="members-list">
      {members.map((member) => (
        <MemberCard
          key={member.membershipId}
          member={member}
          canManage={canManage}
          busy={busyId === member.membershipId}
          onChangeRole={onChangeRole}
          onRemove={onRemove}
        />
      ))}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          <Button
            variant="secondary"
            disabled={!pagination.hasPrevPage}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} members
          </span>
          <Button
            variant="secondary"
            disabled={!pagination.hasNextPage}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
