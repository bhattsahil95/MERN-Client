const normalizeDetails = (text) => {
    if (!text) return [];
    if (Array.isArray(text)) return text.filter(Boolean);
    return [text];
};

function ExperienceTimeline({ data }) {
    return (
        <div className="experience-timeline">
            {data.map((item, index) => {
                const details = normalizeDetails(item.cardDetailedText);
                const isLast = index === data.length - 1;

                return (
                    <article
                        className={`experience-item${isLast ? " experience-item--last" : ""}`}
                        key={`${item.cardTitle}-${item.title}-${index}`}
                    >
                        <div className="experience-item__track">
                            <span className="experience-item__dot" aria-hidden="true" />
                            {!isLast && (
                                <span
                                    className="experience-item__line"
                                    aria-hidden="true"
                                />
                            )}
                        </div>

                        <div className="experience-item__body">
                            <time className="experience-item__date">
                                {item.title}
                            </time>
                            <h4 className="experience-item__role">
                                {item.cardTitle}
                            </h4>
                            <p className="experience-item__org">
                                {item.cardSubtitle}
                            </p>

                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="experience-item__link"
                                >
                                    View credential →
                                </a>
                            )}

                            {item.media?.source?.url && (
                                <a
                                    href={item.media.source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="experience-item__cert"
                                >
                                    <img
                                        src={item.media.source.url}
                                        alt={item.media.name || "Certificate"}
                                    />
                                </a>
                            )}

                            {details.length > 0 && (
                                <ul className="experience-item__list">
                                    {details.map((line, i) => (
                                        <li key={i}>{line.replace(/^🔹\s*/, "")}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

export default ExperienceTimeline;
