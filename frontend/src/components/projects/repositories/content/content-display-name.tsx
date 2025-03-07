import { useMemo } from "react";

import { Content } from "@/validators/content";

import { getContentDisplayValue } from "@/lib/utils";

const ContentDisplayName = ({ content }: { content: Content }) => {
    const displayName = useMemo(
        () => getContentDisplayValue(content),
        [content]
    );

    return <span>{displayName}</span>;
};

export default ContentDisplayName;
