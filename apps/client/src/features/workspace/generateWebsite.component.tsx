import { useEffect } from 'react';
import { useGenerateWebsiteQuery } from '../../common/apiSlice';

export type GenerateWebsiteComponentProps = {
    projectId: string;
    onDownloadComplete: () => void;
};

export const GenerateWebsiteComponent = (props: GenerateWebsiteComponentProps) => {
    const { data, error, isLoading } = useGenerateWebsiteQuery(props.projectId);

    useEffect(() => {
        if (data || error) {
            props.onDownloadComplete();
        }
    }, [data, error]);

    return <>{isLoading && <p>Generating...</p>}</>;
};
