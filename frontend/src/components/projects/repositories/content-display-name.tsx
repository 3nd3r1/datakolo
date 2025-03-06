import { useMemo } from "react";

import { getContentDisplayValue } from "@/lib/utils";
import { Content } from "@/validators/content";

const ContentDisplayName = ({ content }: { content: Content }) => {
    const displayName = useMemo(
        () => getContentDisplayValue(content),
        [content]
    );

    return <span>{displayName}</span>;
};

export default ContentDisplayName;
