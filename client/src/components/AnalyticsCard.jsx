const AnalyticsCard = ({
  title,
  value,
  color,
  icon,
}) => {

  return (
    <div
      className={`rounded-2xl shadow-md p-6 text-white ${color}`}
    >

      <div className="flex justify-between items-center">

        <h3 className="text-lg font-medium">
          {title}
        </h3>

        {icon}

      </div>

      <p className="text-4xl font-bold mt-5">
        {value}
      </p>

    </div>
  );
};

export default AnalyticsCard;