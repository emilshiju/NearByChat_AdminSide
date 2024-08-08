
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import ReportSharpIcon from '@mui/icons-material/ReportSharp';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Menus = [
    { title: "Users", src: "Overview",icon:PeopleAltSharpIcon,link:"/"},
    {title:"Report",src:"OverView",icon:ReportSharpIcon,link:"/report"},
    { title: "Subscription", src: "Overview",icon:CardMembershipRoundedIcon,
        subMenu:[{title:"AddSubscription",icon:ReportSharpIcon,link:"/addSubscription"},
               {title:"ListSubscription",icon:ReportSharpIcon,link:"/listSubscription"}]
    },
    { title: "subscriptionList", src: "Overview",icon:SubscriptionsOutlinedIcon ,link:"/subscribersList"},
    { title: "Dashboard", src: "Overview",icon:DashboardIcon ,link:"/dashboard" },
    // { title: "Overview", src: "Overview"  },
    // { title: "Overview", src: "Overview"  },
    // { title: "Overview", src: "Overview"  },
    // { title: "Overview", src: "Overview"  },
    // { title: "Overview", src: "Overview"  },


    ];


    export default Menus