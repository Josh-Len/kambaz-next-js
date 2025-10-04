
<div id="wd-kambaz">
  <table width="100%">
    <tr><td valign="top">
      <KambazNavigation />
      </td><td valign="top">
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="Account" />} />
        <Route path="/Account/*" element={<Account />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Courses/:cid/*" element={<Courses />} />
      </Routes>
    </div>
      </td></tr>
  </table>
</div>

