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
