const Scale = (() => {
  const TOGGLE_UP = document.querySelector('[data-increase="floorplan-scale"]');
  const TOGGLE_DOWN = document.querySelector('[data-decrease="floorplan-scale"]');
  const TOGGLE_RESET = document.querySelector('[data-reset="floorplan-scale"]');
  const CORE = document.getElementById('core');
  let CURRENT_KEY = 4;
  const ORIGINAL_KEY = 4;
  const VALUES = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4];

  function init() {
    if (!TOGGLE_UP || !TOGGLE_DOWN || !TOGGLE_RESET || !CORE) {
      throw new Error('insufficent UI exists for scale variations');
    }

    _addEventListeners();
  }

  function _addEventListeners() {
    TOGGLE_UP.addEventListener('click', _increase);
    TOGGLE_DOWN.addEventListener('click', _decrease);
    TOGGLE_RESET.addEventListener('click', _reset);
  }

  function _increase(evt) {
    CURRENT_KEY++;
    if (CURRENT_KEY >= VALUES.length - 1) {
      CURRENT_KEY = VALUES.length - 1;
    }
    console.log('increase', CURRENT_KEY);
    _render();
  }

  function _decrease(evt) {
    CURRENT_KEY--;
    if (CURRENT_KEY <= 0) {
      CURRENT_KEY = 0;
    }
    console.log('decrease', CURRENT_KEY);
    _render();
  }

  function _reset(evt) {
    CURRENT_KEY = ORIGINAL_KEY;
    _render();
  }

  function _render() {
    CORE.setAttribute("data-floorplan-scale", VALUES[CURRENT_KEY]);
  }

  return {
    init: init,
  }

})();
Scale.init();

const Grid = (() => {
  const TOGGLE = document.querySelectorAll('[data-toggle="grid"]');
  const CORE = document.getElementById('core');

  function init() {
    if (!TOGGLE || !CORE) {
      throw new Error('insufficent UI exists for grid toggle');
    }

    _addEventListeners();
  }

  function _addEventListeners() {
    TOGGLE.forEach(toggle => toggle.addEventListener('click', _toggle));
  }

  function _toggle(evt) {
    if (evt.target != evt.currentTarget) return;

    core.classList.toggle('grid-is-hidden');
  }

  return {
    init: init
  };
})();
Grid.init();

const Sidebar = (() => {
  const TOGGLE = document.querySelectorAll('[data-toggle="sidebar"]');
  const CORE = document.getElementById('core');

  function init() {
    if (!TOGGLE || !CORE) {
      throw new Error('insufficent UI exists for sidebar toggle');
    }

    _addEventListeners();
  }

  function _addEventListeners() {
    TOGGLE.forEach(toggle => toggle.addEventListener('click', _toggle));
  }

  function _toggle(evt) {
    if (evt.target != evt.currentTarget) return;

    core.classList.toggle(
      window.innerWidth <= 767 ? 'mobile-is-collapsed' : 'desktop-is-collapsed'
    );
  }

  return {
    init: init
  };
})();
Sidebar.init();

const Navs = (() => {
  const NAVS = document.querySelectorAll('[data-toggle="nav"]');
  const NAVS_ACTIVE = {
    nav: null,
    pane: null
  };

  function init() {
    if (!NAVS || NAVS.length < 1) {
      throw new Error('no navs exist');
    }

    _addEventListeners();
  }

  function _addEventListeners() {
    NAVS.forEach(nav => {
      _checkActiveNav(nav);
      nav.addEventListener('click', _toggle);
    });
  }

  function _toggle(evt) {
    if (evt.target != evt.currentTarget) {
      return;
    }

    _clearActiveNav();
    _updateActiveNav({
      nav: evt.target,
      pane: document.getElementById(evt.target.getAttribute('data-target'))
    });
  }

  function _checkActiveNav(item) {
    if (item.classList.contains('active')) {
      NAVS_ACTIVE.nav = item;
      NAVS_ACTIVE.pane = document.getElementById(
        item.getAttribute('data-target')
      );
    }
  }

  function _clearActiveNav() {
    if (!!NAVS_ACTIVE.nav && !!NAVS_ACTIVE.pane) {
      NAVS_ACTIVE.nav.classList.remove('active');
      NAVS_ACTIVE.pane.classList.remove('active');
      NAVS_ACTIVE.nav = null;
      NAVS_ACTIVE.pane = null;
    }
  }

  function _updateActiveNav(opts) {
    if (!opts.nav || !opts.pane) {
      throw new Error('invalid opts');
    }
    NAVS_ACTIVE.nav = opts.nav;
    NAVS_ACTIVE.pane = opts.pane;
    NAVS_ACTIVE.nav.classList.add('active');
    NAVS_ACTIVE.pane.classList.add('active');
  }

  return {
    init: init
  };
})();

Navs.init();
