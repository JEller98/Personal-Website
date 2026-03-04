# Scalable Project Architecture
To add more work to the "Projects" section:

1) In ``index.html``, create a new ``project-card`` class under the ``project-grid`` class in the ``cards`` section
2) In ``script.js``, create a new object in the ``projects`` data at the top of the file. Remember to include the folowing:
-``title``
-``image``
-``description``
-``links`` (another object)
--``href``
--``img``*
--``alt``
--``title``

*``img`` and everything below it can be omitted in favor of ``text`` for text-based links instead.

# To-do:
1) Test out Tablet/Mobile view on real hardware

# Future work:
1) Isolate data into a separate JSON file, read into ``script.js``.
2) Implement a "max # of displayed projects" before a drop-down arrow appears, prompting the user to "show more"; maybe 2 rows? Test this out.
3) Allow project cards to be selectable via ``Tab`` key; lock users' ``Tab`` inputs inside the modal until they select the close button.
4) More research on accessibility stuff...
5) See about recycling the scalable architecture from ``Projects`` for ``Experience``.
