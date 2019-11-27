class ApplicationLeftNav extends Component {
  listItems = [
    {
      icon: "fa fa-tachometer",
      display: "Dashboard",
      uri: "/dashboard",
      subs: []
    },
    {
      icon: "fa fa-tags",
      display: "Order Management",
      uri: "/order-management",
      subs: [
        {
          display: "New Order",
          uri: "/order-management/new-order"
        },
        {
          display: "All Orders",
          uri: "/order-management/view-orders"
        },
        {
          display: "Design Orders",
          uri: "/order-management/view-orders/design"
        },
        {
          display: "Print Orders",
          uri: "/order-management/view-orders/print"
        },
        {
          display: "Booklet Orders",
          uri: "/order-management/view-orders/booklets"
        },
        {
          display: "Wide Format Orders",
          uri: "/order-management/view-orders/wide-format"
        },
        {
          display: "Comp Cart",
          uri: "/order-management/view-orders/comp-cart"
        },
        {
          display: "Shopping Cart",
          uri: "/order-management/view-orders/shopping-cart"
        },
        {
          display: "Estimates",
          uri: "/order-management/view-orders/estimates"
        },
        {
          display: "Quote Request",
          uri: "/order-management/view-orders/quote-request"
        }
      ]
    },
    {
      icon: "fa fa-comment",
      display: "Customer Chat",
      uri: "/customer-chat",
      subs: [
        {
          display: "Customer Chat",
          uri: "/customer-chat"
        },
        {
          display: "Customer Chat Settings",
          uri: "/customer-chat/settings"
        }
      ]
    },
    {
      icon: "fa fa-user",
      display: "Client Management",
      uri: "/client-management",
      subs: [
        {
          display: "Client Listing",
          uri: "/client-management/client-listing"
        },
        {
          display: "New Client",
          uri: "/client-management/client-new"
        },
        {
          display: "Import Clients",
          uri: "/client-management/import"
        },
        {
          display: "Export Clients",
          uri: "/client-management/export"
        }
      ]
    },
    {
      icon: "fa fa-envelope",
      display: "Internal Messaging",
      uri: "/internal-messaging",
      subs: [
        {
          display: "Inbox",
          uri: "/internal-messaging/inbox"
        },
        {
          display: "Direct Messages",
          uri: "/internal-messaging/direct-messages"
        },
        {
          display: "Quote Request",
          uri: "/internal-messaging/quote-request"
        },
        {
          display: "Contact Request",
          uri: "/internal-messaging/contact-request"
        },
        {
          display: "E2PS",
          uri: "/internal-messaging/e2ps"
        },
        {
          display: "Support",
          uri: "/internal-messaging/support"
        },
        {
          display: "Sent",
          uri: "/internal-messaging/sent"
        },
        {
          display: "Trash",
          uri: "/internal-messaging/trash"
        }
      ]
    },
    {
      icon: "fa fa-users",
      display: "Staff Management",
      uri: "/staff-management",
      subs: [
        {
          display: "Staff Listing",
          uri: "/staff-management/staff-listing"
        },
        {
          display: "New Staff Member",
          uri: "/staff-management/staff-new"
        }
      ]
    },

    {
      icon: "fa fa-truck",
      display: "Supllier Management",
      uri: "/supplier-management",
      subs: [
        {
          display: "Supplier Listing",
          uri: "/supplier-management/supplier-listing"
        },
        {
          display: "New Supplier",
          uri: "/supplier-management/supplier-new"
        }
      ]
    },

    {
      icon: "fa fa-money",
      display: "Coupon Management",
      uri: "/coupon-management",
      subs: []
    },
    {
      icon: "fa fa-gears",
      display: "Print Products",
      uri: "/print-products",
      subs: []
    },
    {
      icon: "fa fa-star",
      display: "Customers Reviews",
      uri: "/customer-reviews",
      subs: []
    },
    {
      icon: "fa fa-building",
      display: "Administrative",
      uri: "/administrative",
      subs: []
    },
    {
      icon: "fa fa-file",
      display: "Page Management",
      uri: "/page-management",
      subs: []
    },
    {
      icon: "fa fa-picture-o",
      display: "Portfolio",
      uri: "/portfolio",
      subs: []
    }
  ];

  render() {
    const openToggle = (e, index, l) => {
      if (l < 1) return;
      e.preventDefault();
      const li = document.querySelectorAll(".left-sidebar-elements > li");
      for (let i = 0; i < li.length; i++) {
        if (i !== index) li[i].classList.remove("open");
      }
      li[index].classList.toggle("open");

      if (li[index].classList.contains("open")) {
        const scrollDiv = document.querySelector(
          ".left-menu-section > div > div"
        );

        setTimeout(() => {
          scrollDiv.scrollTo({
            top: li[index].offsetTop,
            behavior: "smooth"
          });
        }, 100);
      }
    };

    return (
      <React.Fragment>
        <div className="left-menu-section">
          <Scrollbars
            autoHide
            style={{
              autoHeight: true
            }}
          >
            <ul className="left-sidebar-elements">
              {this.listItems.map((listItem, index) => (
                <li key={index}>
                  <NavLink
                    className={listItem.subs.length > 0 ? "parent" : ""}
                    to={"/console" + listItem.uri}
                    onClick={e => openToggle(e, index, listItem.subs.length)}
                  >
                    <i className={listItem.icon} />
                    <span>{listItem.display}</span>
                  </NavLink>
                  {listItem.subs.length > 0 && (
                    <ul>
                      {listItem.subs.map(sub => (
                        <li key={sub.uri}>
                          <Link to={"/console" + sub.uri}>{sub.display}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationLeftNav;
