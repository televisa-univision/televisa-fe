import stripHtmlSSR, { truncate } from '../stripHtmlSSR';

/**
 * @test {toCamelCase}
 */
describe('stripHtmlSSR test', () => {
  it('should return the same string if the length is not greater than the default length', () => {
    const innerHTML = '<b>This is </b>a mock html text';
    const text = stripHtmlSSR(innerHTML);
    expect(innerHTML).toEqual(text);
  });

  it('should return trucanted text for a complex html elemt', () => {
    const innerHTML = 'Mientras el <a href="https://www.univision.com/famosos/christian-nodal-belinda-ex-estibaliz-badiola-romance-ruptura-fotos" data-cms-id="0000017b-c038-dc43-adfb-e87b368d0001" data-cms-href="/famosos/christian-nodal-belinda-ex-estibaliz-badiola-romance-ruptura-fotos" link-data="{&quot;cms.content.publishDate&quot;:1634862447685,&quot;cms.content.publishUser&quot;:{&quot;_ref&quot;:&quot;0000016d-3f9f-d307-a7ef-bfdf7fec0000&quot;,&quot;_type&quot;:&quot;6aa69ae1-35be-30dc-87e9-410da9e1cdcc&quot;},&quot;cms.content.updateDate&quot;:1634862447685,&quot;cms.content.updateUser&quot;:{&quot;_ref&quot;:&quot;0000016d-3f9f-d307-a7ef-bfdf7fec0000&quot;,&quot;_type&quot;:&quot;6aa69ae1-35be-30dc-87e9-410da9e1cdcc&quot;},&quot;link&quot;:{&quot;attributes&quot;:,&quot;item&quot;:{&quot;_ref&quot;:&quot;0000017b-c038-dc43-adfb-e87b368d0001&quot;,&quot;_type&quot;:&quot;8bef3534-a8b9-3d63-8ef0-f2da41b84783&quot;},&quot;_id&quot;:&quot;0000017c-a564-dd51-abfe-a7e5336d0001&quot;,&quot;_type&quot;:&quot;c3f0009d-3dd9-3762-acac-88c3a292c6b2&quot;},&quot;linkText&quot;:&quot;prometido de Belinda&quot;,&quot;_id&quot;:&quot;0000017c-a564-dd51-abfe-a7e5336d0000&quot;,&quot;_type&quot;:&quot;809caec9-30e2-3666-8b71-b32ddbffc288&quot;}">prometido de Belinda</a>  daba un concierto en la ciudad de Mexicali, se percató que una anciana quería saludarlo, pero había sido detenida por la seguridad del evento, lo que al cantante no le pareció e intervino.';
    const text = stripHtmlSSR(innerHTML, 100);
    expect(text).toEqual('Mientras el <a href="https://www.univision.com/famosos/christian-nodal-belinda-ex-estibaliz-badiola-romance-ruptura-fotos" data-cms-id="0000017b-c038-dc43-adfb-e87b368d0001" data-cms-href="/famosos/christian-nodal-belinda-ex-estibaliz-badiola-romance-ruptura-fotos" link-data="{&quot;cms.content.publishDate&quot;:1634862447685,&quot;cms.content.publishUser&quot;:{&quot;_ref&quot;:&quot;0000016d-3f9f-d307-a7ef-bfdf7fec0000&quot;,&quot;_type&quot;:&quot;6aa69ae1-35be-30dc-87e9-410da9e1cdcc&quot;},&quot;cms.content.updateDate&quot;:1634862447685,&quot;cms.content.updateUser&quot;:{&quot;_ref&quot;:&quot;0000016d-3f9f-d307-a7ef-bfdf7fec0000&quot;,&quot;_type&quot;:&quot;6aa69ae1-35be-30dc-87e9-410da9e1cdcc&quot;},&quot;link&quot;:{&quot;attributes&quot;:,&quot;item&quot;:{&quot;_ref&quot;:&quot;0000017b-c038-dc43-adfb-e87b368d0001&quot;,&quot;_type&quot;:&quot;8bef3534-a8b9-3d63-8ef0-f2da41b84783&quot;},&quot;_id&quot;:&quot;0000017c-a564-dd51-abfe-a7e5336d0001&quot;,&quot;_type&quot;:&quot;c3f0009d-3dd9-3762-acac-88c3a292c6b2&quot;},&quot;linkText&quot;:&quot;prometido de Belinda&quot;,&quot;_id&quot;:&quot;0000017c-a564-dd51-abfe-a7e5336d0000&quot;,&quot;_type&quot;:&quot;809caec9-30e2-3666-8b71-b32ddbffc288&quot;}">prometido de Belinda</a>  daba un concierto en la ciudad de Mexicali, se percató que una anc');
  });
});

/**
 * @test {truncateHtml}
 */
describe('truncateHtml', () => {
  it('should truncate text with given length', () => {
    let input = 'hello';
    let actual = truncate(input, 3);
    let expected = 'hel...';
    expect(actual).toEqual(expected);

    input = 'I am not sure what I am talking about';
    actual = truncate(input, 10);
    expected = 'I am not s...';
    expect(actual).toEqual(expected);
  });

  it('should keep url safe', () => {
    let input = 'Hey http://distilleryimage8.s3.amazonaws.com/719bf2329ddd11e28c3122000aa80097_7.jpg';
    let actual = truncate(input, 4);
    let expected = 'Hey ...';
    expect(actual).toEqual(expected);

    input = 'Hey http://distilleryimage8.s3.amazonaws.com/719bf2329ddd11e28c3122000aa80097_7.jpg';
    actual = truncate(input, 5);
    expected = 'Hey http://distilleryimage8.s3.amazonaws.com/719bf2329ddd11e28c3122000aa80097_7.jpg';
    expect(actual).toEqual(expected);

    input = 'Hey http://hehe.com http://plop.com';
    actual = truncate(input, 6);
    expected = 'Hey http://hehe.com...';
    expect(actual).toEqual(expected);
  });

  it('should keep tag safe', () => {
    let input = '<p><div>hello</p></div>';
    let actual = truncate(input, 3);
    let expected = '<p><div>hel...</div></p>';
    expect(actual).toEqual(expected);

    input = '<p><div>hello world</p></div>';
    actual = truncate(input, 5);
    expected = '<p><div>hello...</div></p>';
    expect(actual).toEqual(expected);

    input = '<p><div data-source="yahoo">hello world</p></div>';
    actual = truncate(input, 5);
    expected = '<p><div data-source="yahoo">hello...</div></p>';
    expect(actual).toEqual(expected);

    // complex example
    input = '<b class="yui3-highlight">Zooey</b> Deschanel embodies quirky cute and she is quickly becoming America\'s sweetheart. <b class="yui3-highlight">Here</b> are some of the "New Girl" star\'s best looks and information on w<b class="yui3-highlight">here</b> you can buy them';
    actual = truncate(input, 100);
    expected = '<b class="yui3-highlight">Zooey</b> Deschanel embodies quirky cute and she is quickly becoming America\'s sweetheart. <b class="yui3-highlight">Here</b> are some...';
    expect(actual).toEqual(expected);

    // crazy example
    input = '<div class="res sc" id="news_cluster"><div class="news_mix"><div class="news_text"><a href="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdDTQtDMD;_ylu=X3oDMTEzb3FxaW0zBHBvcwMyBHNlYwNzcgRjb2xvA3NwMgR2dGlkA1VTTklDN18y/SIG=12s06lheg/EXP=1328323386/**http%3a//news.yahoo.com/obama-pushes-veterans-jobs-programs-165818778.html" class="yschttl spt" dirtyhref="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdDTQtDMD;_ylu=X3oDMTEzb3FxaW0zBHBvcwMyBHNlYwNzcgRjb2xvA3NwMgR2dGlkA1VTTklDN18y/SIG=12s06lheg/EXP=1328323386/**http%3a//news.yahoo.com/obama-pushes-veterans-jobs-programs-165818778.html"><b>Obama</b> pushes for veterans jobs programs</a><div class="snip"><span>In an effort to cut the unemployment rate among veterans, President Barack <b>Obama</b> is calling for a new conservation program that would put veterans to work rebuilding trails, roads and levees on public lands.</span></div><div class="source"><span><b>Associated Press via Yahoo! News - 54 minutes ago</b></span></div><ul class="stories"><li><a href="http://news.yahoo.com/obama-congress-dont-muck-recovery-175036839.html" class="news_heading" dirtyhref="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdTTQtDMD;_ylu=X3oDMTE1aGJsOG9pBHBvcwMyLjEEc2VjA3NyBGNvbG8Dc3AyBHZ0aWQDVVNOSUM3XzI-/SIG=12q0b2d6u/EXP=1328323386/**http%3a//news.yahoo.com/obama-congress-dont-muck-recovery-175036839.html"> <b>Obama</b> to Congress : don\'t \'muck up\' recovery</a><span class="sim_source"> - AFP via Yahoo! News</span></li><li><a href="http://news.yahoo.com/obama-says-policies-extension-faith-202259370.html" class="news_heading" dirtyhref="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdjTQtDMD;_ylu=X3oDMTE1Y25tNnZ2BHBvcwMyLjIEc2VjA3NyBGNvbG8Dc3AyBHZ0aWQDVVNOSUM3XzI-/SIG=12sd0ur8u/EXP=1328323386/**http%3a//news.yahoo.com/obama-says-policies-extension-faith-202259370.html"> <b>Obama</b> says his policies are extension of h...</a><span class="sim_source"> - Associated Press via Yahoo! News</span></li><li><a href="http://news.yahoo.com/obama-economic-recovery-speeding-164051167.html" class="news_heading" dirtyhref="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdzTQtDMD;_ylu=X3oDMTE1cWx1dGloBHBvcwMyLjMEc2VjA3NyBGNvbG8Dc3AyBHZ0aWQDVVNOSUM3XzI-/SIG=12pmq6h9t/EXP=1328323386/**http%3a//news.yahoo.com/obama-economic-recovery-speeding-164051167.html"> <b>Obama</b>: Economic recovery speeding up</a><span class="sim_source"> - Associated Press via Yahoo! News</span></li><li class="more_stories"><a href="http://news.search.yahoo.com/search;_ylt=A2KJjam6KixPXHwAeDTQtDMD?p=obama&amp;fr=sfp&amp;tmpl=USNIC7&amp;clid=UqJpXLdI4hEinwkE2loGUpbI">all 94 news articlesâ¦</a></li></ul></div></div></div>';
    actual = truncate(input, 200);
    expected = '<div class="res sc" id="news_cluster"><div class="news_mix"><div class="news_text"><a href="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdDTQtDMD;_ylu=X3oDMTEzb3FxaW0zBHBvcwMyBHNlYwNzcgRjb2xvA3NwMgR2dGlkA1VTTklDN18y/SIG=12s06lheg/EXP=1328323386/**http%3a//news.yahoo.com/obama-pushes-veterans-jobs-programs-165818778.html" class="yschttl spt" dirtyhref="http://rds.yahoo.com/_ylt=A2KJjam6KixPXHwAdDTQtDMD;_ylu=X3oDMTEzb3FxaW0zBHBvcwMyBHNlYwNzcgRjb2xvA3NwMgR2dGlkA1VTTklDN18y/SIG=12s06lheg/EXP=1328323386/**http%3a//news.yahoo.com/obama-pushes-veterans-jobs-programs-165818778.html"><b>Obama</b> pushes for veterans jobs programs</a><div class="snip"><span>In an effort to cut the unemployment rate among veterans, President Barack <b>Obama</b> is calling for a new conservation program that would put veterans to work rebuil...</span></div></div></div></div>';
    expect(actual).toEqual(expected);
  });

  it('should handle non-closed tag such as <img> well', () => {
    let input = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo">Do you <b>think</b> it is useful</div></p>';
    let actual = truncate(input, 3);
    let expected = '<p><div>Do ...</div></p>';
    expect(actual).toEqual(expected);

    actual = truncate(input, 10);
    expected = '<p><div>Do you <b>thi...</b></div></p>';
    expect(actual).toEqual(expected);

    input = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo">Do you <b>think</b> it is useful</div></p>';
    actual = truncate(input, 3, { keepImageTag: true });
    expected = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo">Do ...</div></p>';
    expect(actual).toEqual(expected);
  });

  it('should handle self-closed tag such as <img/> well', () => {
    let input = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo" />Do you <b>think</b> it is useful</div></p>';
    let actual = truncate(input, 3);
    let expected = '<p><div>Do ...</div></p>';
    expect(actual).toEqual(expected);

    input = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo" />Do you <b>think</b> it is useful</div></p>';
    actual = truncate(input, 3, { keepImageTag: true });
    expected = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo" />Do ...</div></p>';
    expect(actual).toEqual(expected);

    actual = truncate(input, 10, { keepImageTag: true });
    expected = '<p><div><img class="yahoo" src="http://l.yimg.com/a/i/ww/met/yahoo_logo_us_061509.png" alt="yahoo logo" />Do you <b>thi...</b></div></p>';
    expect(actual).toEqual(expected);
  });

  it('should append ellipsis by default', () => {
    const input = '<p><div>hello</p></div>';
    let actual = truncate(input, 3);
    let expected = '<p><div>hel...</div></p>';
    expect(actual).toEqual(expected);

    actual = truncate(input, 3, { ellipsis: '' });
    expected = '<p><div>hel</div></p>';
    expect(actual).toEqual(expected);

    actual = truncate(input, 3, { ellipsis: '---' });
    expected = '<p><div>hel---</div></p>';
    expect(actual).toEqual(expected);

    actual = truncate(input, 3, { ellipsis: '---WHATEVER-I-WANT' });
    expected = '<p><div>hel---WHATEVER-I-WANT</div></p>';
    expect(actual).toEqual(expected);
  });

  it('should not truncate in the middle of a word', () => {
    // break within slop
    let input = 'a good little fox is a good little forest creature';
    let actual = truncate(input, 26, { truncateLastWord: false });
    let expected = 'a good little fox is a good...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 26, { truncateLastWord: false });
    expected = 'a good little fox is <span>a good...</span>'; // @TODO - this should have the elipsis outside the tag
    expect(actual).toEqual(expected);

    // break within slop
    input = 'a good little fox is a good little forest creature';
    actual = truncate(input, 27, { truncateLastWord: false });
    expected = 'a good little fox is a good...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 27, { truncateLastWord: false });
    expected = 'a good little fox is <span>a good</span>...';
    expect(actual).toEqual(expected);

    // break within slop
    input = 'a good little fox is a good little forest creature';
    actual = truncate(input, 28, { truncateLastWord: false });
    expected = 'a good little fox is a good...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 28, { truncateLastWord: false });
    expected = 'a good little fox is <span>a good</span>...';
    expect(actual).toEqual(expected);

    // break within slop
    input = 'a good little fox is a good little forest creature';
    actual = truncate(input, 29, { truncateLastWord: false });
    expected = 'a good little fox is a good little...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 29, { truncateLastWord: false });
    expected = 'a good little fox is <span>a good</span> little...';
    expect(actual).toEqual(expected);

    // break after not within slop
    input = 'a good little fox is a good little forest creature';
    actual = truncate(input, 29, { truncateLastWord: false, slop: 2 });
    expected = 'a good little fox is a good...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 29, { truncateLastWord: false, slop: 2 });
    expected = 'a good little fox is <span>a good</span>...';
    expect(actual).toEqual(expected);

    // no break within slop
    input = 'a good little fox is a good little forest creature';
    actual = truncate(input, 46, { truncateLastWord: false, slop: 2 });
    expected = 'a good little fox is a good little forest crea...';
    expect(actual).toEqual(expected);
    // with html
    input = 'a good little fox is <span>a good</span> little forest creature';
    actual = truncate(input, 46, { truncateLastWord: false, slop: 2 });
    expected = 'a good little fox is <span>a good</span> little forest crea...';
    expect(actual).toEqual(expected);
  });

  it('should append ellipsis if the string has been shortened', () => {
    const input = 'thisare19characters <a href="http://google.com">http://google.com</a>';
    const actual = truncate(input, 33);
    const expected = 'thisare19characters <a href="http://google.com">http://google...</a>';
    expect(actual).toEqual(expected);
  });
});
