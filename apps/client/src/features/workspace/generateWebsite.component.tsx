import { useEffect } from 'react';
import { useGenerateWebsiteQuery } from '../../common/apiSlice';
import { LoadingComponent } from '../../common/loading.component';

export type GenerateWebsiteComponentProps = {
    projectId: string;
    onDownloadComplete: () => void;
};

export const GenerateWebsiteComponent = (props: GenerateWebsiteComponentProps) => {
    const { data, error, isLoading } = useGenerateWebsiteQuery(props.projectId, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (data || error) {
            props.onDownloadComplete();
        }
    }, [props, data, error, isLoading]);

    return <>{isLoading && <LoadingComponent />}</>;
};
