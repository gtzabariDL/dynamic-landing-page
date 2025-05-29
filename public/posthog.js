!(function (t, e) {
  let o;
  let n;
  let p;
  let r;
  e.__SV ||
    ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          const o = e.split(".");
          2 == o.length && ((t = t[o[0]]), (e = o[1])),
            (t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            });
        }
        ((p = t.createElement("script")).type = "text/javascript"),
          (p.async = !0),
          (p.src = s.api_host + "/static/array.js"),
          (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
        let u = e;
        for (
          void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
          u.people = u.people || [],
          u.toString = function (t) {
            let e = "posthog";
            return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
          },
          u.people.toString = function () {
            return u.toString(1) + ".people (stub)";
          },
          o =
          "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(
            " "
          ),
          n = 0;
          n < o.length;
          n++
        )
          g(u, o[n]);
        e._i.push([i, s, a]);
      }),
      (e.__SV = 1));
})(document, window.posthog || []);
posthog.init("phc_HUjc1K4MXKGgoZ3Vr0CKpDFq61qk5O0zTdKM7fmEWoe", {
  api_host: "https://ph.doorloop.com",
  autocapture: false,
  capture_pageview: false,
  disable_session_recording: true,
  loaded: (ph) => {
    if (window.location.hostname === "localhost") {
      ph.debug();
    }

    ph.capture("visited_landing_page");
    ph.capture("Pageview")

    const email = getQueryParam("email");
    const currentDistinctId = ph.get_distinct_id();
    const urlDistinctId = getQueryParam("pid");

    if (urlDistinctId) {
      ph.identify(urlDistinctId);
    } else if (email) {
      if (currentDistinctId !== email) {
        ph.alias(email);
      }
      ph.identify(email);
      ph.people.set({ email });
    } else {
      ph.identify(currentDistinctId);
    }
  }
});

function getQueryParam(paramName) {
  try {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName) || null;
  } catch (err) {
    var match = new RegExp("[?&]" + paramName + "=([^&]+)").exec(window.location.search);
    return match ? decodeURIComponent(match[1]) : null;
  }
}
