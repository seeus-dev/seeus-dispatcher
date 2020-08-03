import React, { JSXElementConstructor, ReactComponentElement, ReactInstance } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import Sidebar, { MenuItemKey, MenuSelectEvent } from '@/app/components/Sidebar';
import Dashboard from '@/app/views/dashboard/Dashboard';

const AppLayout = styled(Layout)`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

const Content = styled(Layout.Content)`
    margin: 18px;
`;

const Header = styled(Layout.Header)`
    background: #fff;
`;

const tabComponents: any = {
    [MenuItemKey.Dashboard]: Dashboard,
    [MenuItemKey.Reporting]: Dashboard,
    [MenuItemKey.User]: Dashboard,
    [MenuItemKey.Admin]: Dashboard,
};

interface AppState {
    isSidebarCollapsed: boolean;
    isLoggedIn: boolean;
    selectedTab: MenuItemKey;
}

class App extends React.Component<any, AppState> {
    state = {
        isSidebarCollapsed: false,
        isLoggedIn: true,
        selectedTab: MenuItemKey.Dashboard,
    };

    handleMenuSelect = ({ key }: MenuSelectEvent) => {
        console.log(key);
        switch(key) {
            case MenuItemKey.Logout:
                this.setState({ isLoggedIn: false });
            break;
            default:
                this.setState({ selectedTab: key as MenuItemKey });
        }
    };

    renderTabContent() {
        const Tab = tabComponents[this.state.selectedTab];
        return <Tab />;
    }

    render() {
        const { isSidebarCollapsed, selectedTab, isLoggedIn } = this.state;

        if(!isLoggedIn) {
            return (<div>Logged Out</div>);
        }

        return (
            <AppLayout>
                <Sidebar
                    selectedTab={selectedTab}
                    onMenuSelect={this.handleMenuSelect}
                    collapsed={isSidebarCollapsed}
                    onCollapse={(collapsed) => this.setState({ isSidebarCollapsed: collapsed })}
                />
                <Layout>
                    <Header />
                    <Content>
                        { this.renderTabContent() }
                    </Content>
                </Layout>
            </AppLayout>
        );
    }
}

export default App;
