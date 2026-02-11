import MainlayoutTemplate from '@/layouts/app/app-header-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <MainlayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </MainlayoutTemplate>
);
