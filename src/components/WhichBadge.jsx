import { Badge } from '@vapor-ui/core';

export default function WhichBadge({ nickName }) {
  const displayName =
    nickName === 'N'
      ? '내가 만든 냠냠단'
      : `${nickName.length > 10 ? nickName.slice(0, 10) + '...' : nickName}님의 냠냠단`;
  const whatColor = nickName === 'N' ? 'primary' : 'success';

  return (
    <Badge
      size="md"
      shape="square"
      color={whatColor}
      className="truncate max-w-[9.3125rem] rounded-sm"
    >
      {displayName}
    </Badge>
  );
}
