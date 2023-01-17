import classNames from "classnames";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        className,
        "w-fit h-fit bg-blue-500 flex flex-row items-center rounded-lg p-4 drop-shadow-lg"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
