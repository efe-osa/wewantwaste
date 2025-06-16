import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SkipCard from "../../components/SkipCard";
import ProgressIndicator from "../../components/ProgressIndicator";
import classNames from "classnames";
import "./index.css";

// Data model interface
const defaultLocation = { postcode: "NR32", area: "Lowestoft" };

export default function SkipSelectorPage() {
  const [skips, setSkips] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch skip data
  useEffect(() => {
    const fetchSkips = async () => {
      setLoading(true);
      try {
        const url = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${defaultLocation.postcode}&area=${defaultLocation.area}`;
        const res = await axios.get(url);
        setSkips(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load skip options. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkips();
  }, []);

  const handleSelect = (id) =>
    selectedId === id ? setSelectedId("") : setSelectedId(id);

  const handleContinue = () => {
    if (selectedId) {
      console.log("Proceed with skip ID:", selectedId);
      // navigate to next step...
    }
  };

  const selectedSkip = useMemo(
    () => skips.find((skip) => skip.id === selectedId),
    [selectedId]
  );

  if (loading) return <div className="spinner">Loading options…</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <main className="skip-selector-page">
      <ProgressIndicator currentStep={2} />
      <div className="skip-selector-content">
        <h1 className="page-title">Choose Your Skip Size</h1>
        <p className="subtitle subtitle-base">
          Select the skip size that best suits your needs
        </p>
        <div className="cards-grid">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              selected={selectedId === skip.id}
              onSelect={() => handleSelect(skip.id)}
            />
          ))}
        </div>
        {selectedId && (
          <footer className="actions-footer">
            <div className="actions-footer-content">
              <p className="subtitle subtitle-sm">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </p>
              <div className="skip-info">
                <span className="subtitle subtitle-sm">
                  {selectedId && selectedSkip.size} Yard Skip
                </span>
                <div className="skip-info-price">
                  <span className="price">
                    £{selectedId && selectedSkip.price_before_vat}
                  </span>
                  <span className="card-hire">
                    {selectedId && selectedSkip.hire_period_days}‑day hire
                    period
                  </span>
                </div>
                <div className="skip-info-btns">
                  <button
                    type="button"
                    className="btn btn-select btn-secondary"
                    disabled={!selectedId}
                    onClick={handleContinue}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!selectedId}
                    onClick={handleContinue}
                  >
                    Continue
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
