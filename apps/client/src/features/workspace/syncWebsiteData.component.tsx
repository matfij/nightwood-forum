import { useEffect } from 'react';
import { LoadingComponent } from '../../common/loading.component';
import { useSyncWebsiteDataQuery } from './projectsApiSlice';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

export type SyncWebsiteDataComponentProps = {
    projectId: string;
    onSyncComplete: () => void;
};

export const SyncWebsiteDataComponent = (props: SyncWebsiteDataComponentProps) => {
    const { isLoading, status } = useSyncWebsiteDataQuery(props.projectId, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (status === QueryStatus.fulfilled || status === QueryStatus.rejected) {
            props.onSyncComplete();
        }
    }, [props, status]);

    return <>{isLoading && <LoadingComponent />}</>;
};
