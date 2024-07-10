import React from "react";
//TODO: alias
import { ConversionItem } from "src/domains";

interface RecentConversionsProps {
  items: Array<ConversionItem>;
  onItemClick: (text: string) => void;
}

export const RecentConversions: React.FC<RecentConversionsProps> = ({
  items,
  onItemClick,
}) => {
  const RecentConversionsWrapper = ({
    children,
  }: {
    children?: React.ReactNode;
  }): JSX.Element => (
    <div className="col-start-1 col-end-4 row-start-1 row-end-9 mt-2 mr-1 mb-2 ml-2 p-3 border-solid border-2 rounded-md border-slate-300 bg-white overflow-y-auto">
      <>{children}</>
    </div>
  );

  if (!items.length) {
    return (
      <RecentConversionsWrapper>
        <h2 className="text-lg font-bold">No recent conversions.</h2>
      </RecentConversionsWrapper>
    );
  }

  return (
    <RecentConversionsWrapper>
      <h2 className="text-lg font-bold">Recent conversions:</h2>
      <ul className="list-square ml-4">
        {items.map((el) => (
          <li
            key={el.id}
            onClick={() => onItemClick(el.value)}
            className="duration-200 cursor-pointer hover:text-red-600"
          >
            <div className="text-ellipsis overflow-hidden text-nowrap">
              {el.value}
            </div>
          </li>
        ))}
      </ul>
    </RecentConversionsWrapper>
  );
};
