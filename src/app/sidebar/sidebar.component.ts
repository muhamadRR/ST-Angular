import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
    children2?: ChildrenItems2[];
    collapse?: string,
}
export interface ChildrenItems2 {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Rcom Debugging',
        type: 'sub',
        icontype: 'dvr',
        collapse: 'forms',
        children: [
            {path: 'wizard', title: 'Rcom Preview', ab:'RP'},
            {path: 'extended', title: 'Top Score', ab:'TS'},
            {path: 'regular', title: 'Triggering Tools', ab:'TT'},
            {path: 'validation', title: 'Activity Statistics', ab:'AS'},
            // {path: 'wizard', title: 'Wizard', ab:'W'}
            {path: 'celeryflower', title: 'Celery Flower', ab:'CF'}
        ]
    },{
        path: '/tables',
        title: 'Debugging Tools',
        type: 'sub',
        icontype: 'bug_report',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'JS Validation', ab:'JSV'},
            {path: 'extended', title: 'JSON Validation', ab:'JV'},
            {path: 'datatables.net', title: 'JSON Editor', ab:'JE'},
            {path: 'regexp', title: 'Regexp Tester', ab:'RT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: '/maps', 
             title: 'Google Maps',
             type: 'sub',
             ab:'Jsdf',
             collapse: 'dfadg',
             children2: [
                {path: 'fullscreen', title: 'JS Validation', ab:'JSV'},
                {path: 'vector', title: 'JSON Validation', ab:'JV'},
            ]},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/tools',
        title: 'Tools',
        type: 'sub',
        icontype: 'place',
        collapse: 'tools',
        children: [
            { path: 'google', title: 'Gsdfs', ab: 'GM' },
            { path: 'fullscreen', title: 'Fudfg Map', ab: 'FSM' },
            { path: 'vector', title: 'Vectdsghs Map', ab: 'VM' }
        ]
    }, {
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
