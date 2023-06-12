import { useEffect } from 'react';
import { LoadingComponent } from '../../common/loading.component';
import { useGenerateWebsiteQuery } from './projectsApiSlice';

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
