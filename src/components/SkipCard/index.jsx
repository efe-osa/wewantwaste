import classNames from "classnames";
import NotAllowedBadge from "./NotAllowedBadge";
import "./index.css";

// SkipCard.jsx
export default function SkipCard({ skip, selected, onSelect }) {
  const { id, size, price_before_vat, hire_period_days, allowed_on_road } =
    skip;

  return (
    <>
      <div
        key={id}
        className={classNames("skip-card", { selected })}
        onClick={onSelect}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelect();
        }}
      >
        <div className="card-image-wrapper">
          <div className="tick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <img
            src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg"
            alt="6 Yard Skip"
          />
          <span className="size-badge">{size} Yards</span>
          {allowed_on_road && <NotAllowedBadge />}
        </div>
        <div className="card-body">
          <h2 className="card-title">{size} Yard Skip</h2>
          <p className="card-hire">{hire_period_days}‑day hire period</p>
        </div>
        <div className="card-footer">
          <span className="price">£{price_before_vat}</span>
          <button
            type="button"
            className={classNames("btn btn-select btn-secondary", { selected })}
          >
            <span>{selected ? "Selected" : "Select This Skip "}</span>→
          </button>
        </div>
      </div>
    </>
  );
}
