function emailTemplate(
  title,
  content1,
  content2,
  icon,
  firstName,
  lastName,
  dashboardLink
) {
  let data = `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
  style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New email template 2020-07-24</title>
  <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>
96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]-->
  <style type="text/css">
    @media only screen and (max-width:600px) {

      p,
      ul li,
      ol li,
      a {
        font-size: 16px !important;
        line-height: 150% !important
      }

      h1 {
        font-size: 20px !important;
        text-align: center;
        line-height: 120% !important
      }

      h2 {
        font-size: 16px !important;
        text-align: left;
        line-height: 120% !important
      }

      h3 {
        font-size: 20px !important;
        text-align: center;
        line-height: 120% !important
      }

      h1 a {
        font-size: 20px !important
      }

      h2 a {
        font-size: 16px !important;
        text-align: left
      }

      h3 a {
        font-size: 20px !important
      }

      .es-menu td a {
        font-size: 14px !important
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li,
      .es-header-body a {
        font-size: 10px !important
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li,
      .es-footer-body a {
        font-size: 12px !important
      }

      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li,
      .es-infoblock a {
        font-size: 12px !important
      }

      *[class="gmail-fix"] {
        display: none !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3 {
        text-align: right !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-button-border {
        display: block !important
      }

      a.es-button {
        font-size: 14px !important;
        display: block !important;
        border-left-width: 0px !important;
        border-right-width: 0px !important
      }

      .es-btn-fw {
        border-width: 10px 0px !important;
        text-align: center !important
      }

      .es-adaptive table,
      .es-btn-fw,
      .es-btn-fw-brdr,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .es-adapt-td {
        display: block !important;
        width: 100% !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-m-p0 {
        padding: 0 !important
      }

      .es-m-p0r {
        padding-right: 0 !important
      }

      .es-m-p0l {
        padding-left: 0 !important
      }

      .es-m-p0t {
        padding-top: 0 !important
      }

      .es-m-p0b {
        padding-bottom: 0 !important
      }

      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      tr.es-desk-hidden,
      td.es-desk-hidden,
      table.es-desk-hidden {
        display: table-row !important;
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      .es-desk-menu-hidden {
        display: table-cell !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      table.es-social {
        display: inline-block !important
      }

      table.es-social td {
        display: inline-block !important
      }

      .es-m-p5 {
        padding: 5px !important
      }

      .es-m-p5t {
        padding-top: 5px !important
      }

      .es-m-p5b {
        padding-bottom: 5px !important
      }

      .es-m-p5r {
        padding-right: 5px !important
      }

      .es-m-p5l {
        padding-left: 5px !important
      }

      .es-m-p10 {
        padding: 10px !important
      }

      .es-m-p10t {
        padding-top: 10px !important
      }

      .es-m-p10b {
        padding-bottom: 10px !important
      }

      .es-m-p10r {
        padding-right: 10px !important
      }

      .es-m-p10l {
        padding-left: 10px !important
      }

      .es-m-p15 {
        padding: 15px !important
      }

      .es-m-p15t {
        padding-top: 15px !important
      }

      .es-m-p15b {
        padding-bottom: 15px !important
      }

      .es-m-p15r {
        padding-right: 15px !important
      }

      .es-m-p15l {
        padding-left: 15px !important
      }

      .es-m-p20 {
        padding: 20px !important
      }

      .es-m-p20t {
        padding-top: 20px !important
      }

      .es-m-p20r {
        padding-right: 20px !important
      }

      .es-m-p20l {
        padding-left: 20px !important
      }

      .es-m-p25 {
        padding: 25px !important
      }

      .es-m-p25t {
        padding-top: 25px !important
      }

      .es-m-p25b {
        padding-bottom: 25px !important
      }

      .es-m-p25r {
        padding-right: 25px !important
      }

      .es-m-p25l {
        padding-left: 25px !important
      }

      .es-m-p30 {
        padding: 30px !important
      }

      .es-m-p30t {
        padding-top: 30px !important
      }

      .es-m-p30b {
        padding-bottom: 30px !important
      }

      .es-m-p30r {
        padding-right: 30px !important
      }

      .es-m-p30l {
        padding-left: 30px !important
      }

      .es-m-p35 {
        padding: 35px !important
      }

      .es-m-p35t {
        padding-top: 35px !important
      }

      .es-m-p35b {
        padding-bottom: 35px !important
      }

      .es-m-p35r {
        padding-right: 35px !important
      }

      .es-m-p35l {
        padding-left: 35px !important
      }

      .es-m-p40 {
        padding: 40px !important
      }

      .es-m-p40t {
        padding-top: 40px !important
      }

      .es-m-p40b {
        padding-bottom: 40px !important
      }

      .es-m-p40r {
        padding-right: 40px !important
      }

      .es-m-p40l {
        padding-left: 40px !important
      }
    }

    #outlook a {
      padding: 0;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    .es-button-border:hover a.es-button {
      background: #ffffff !important;
      border-color: #ffffff !important;
    }

    .es-button-border:hover {
      background: #ffffff !important;
      border-style: solid solid solid solid !important;
      border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3 !important;
    }

    td .es-button-border:hover a.es-button-1 {
      background: #1fbb3e !important;
      border-color: #1fbb3e !important;
      color: #cefdc5 !important;
    }

    td .es-button-border-2:hover {
      background: #1fbb3e !important;
      border-color: #cefdc5 #cefdc5 #cefdc5 #cefdc5 !important;
    }
  </style>
</head>

<body
  style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FAFAFA">
    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
      <tr style="border-collapse:collapse">
        <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" class="es-header" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
              <td class="es-adaptive" align="center" style="padding:0;Margin:0">
                <table class="es-header-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3D5CA3;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center">
                  <tr class="es-mobile-hidden" style="border-collapse:collapse">
                    <td
                      style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#CEFDC5"
                      bgcolor="#cefdc5" align="left">
                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:140px" valign="top">
<![endif]-->
                      <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                          <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:120px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;font-size:0px"><img
                                    src="https://itjmcv.stripocdn.email/content/guids/29d44cd4-3c6a-46d5-a9e3-e724afe61379/images/33271595595954385.png"
                                    alt
                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                    width="63" height="63"></td>
                              </tr>
                            </table>
                          </td>
                          <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td>
                        </tr>
                      </table>
                      <!--[if mso]></td>
<td style="width:245px" valign="top"><![endif]-->
                      <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                          <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:245px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td align="center" class="es-m-p0" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:28px;color:#666666">
                                    <strong>FIRS-HILAL COO<span
                                        style="font-size:15px"></span>PERATIVE<br>SOCIETY</strong></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td><td style="width:155px" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0;width:155px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr class="es-mobile-hidden" style="border-collapse:collapse">
                                <td align="right" class="es-m-txt-c" style="padding:10px;Margin:0"><span
                                    class="es-button-border es-button-border-2"
                                    style="border-style:solid;border-color:#CEFDC5;background:#33DD55;border-width:2px;display:inline-block;border-radius:10px;width:auto">
                                    <a href="" class="es-button es-button-1" target="_blank"
                                      style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#FFFFFF;border-style:solid;border-color:#33DD55;border-width:15px 20px 15px 20px;display:inline-block;background:#33DD55;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center">Get
                                      Started</a></span></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                  <tr style="border-collapse:collapse">
                    <td align="left" bgcolor="#f2f7f3"
                      style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:#F2F7F3">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                            <table
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top"
                              width="100%" cellspacing="0" cellpadding="0" role="presentation">
                              <tr style="border-collapse:collapse">
                                <td align="center"
                                  style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px"><img
                                    src="${icon}"
                                    alt
                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                    width="80" height="80"></td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px">
                                  <h1
                                    style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333">
                                    <b>${title}</b></h1>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">
                                    HI,&nbsp;${firstName} ${lastName}</p>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">
                                    ${content1}</p>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center"
                                  style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">
                                    ${content2}
                                    </p>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center"
                                  style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px">
                                  <span class="es-button-border"
                                    style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto">
                                    <a href="${dashboardLink}" class="es-button" target="_blank"
                                      style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:13px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:16px;width:auto;text-align:center">GO
                                      TO DASHBOARD</a></span></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px">
                      <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:199px" valign="top"><![endif]-->
                      <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0;width:199px">
                            <table
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center"
                              width="100%" cellspacing="0" cellpadding="0" role="presentation">
                              <tr style="border-collapse:collapse">
                                <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">
                                    <strong>Follow us:</strong></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td><td style="width:20px"></td>
<td style="width:361px" valign="top"><![endif]-->
                      <table class="es-right" cellspacing="0" cellpadding="0" align="right"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0;width:361px">
                            <table
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center"
                              width="100%" cellspacing="0" cellpadding="0" role="presentation">
                              <tr style="border-collapse:collapse">
                                <td class="es-m-txt-c" align="left"
                                  style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;font-size:0">
                                  <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img
                                          src="https://itjmcv.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png"
                                          alt="Fb" title="Facebook" width="32" height="32"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img
                                          src="https://itjmcv.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png"
                                          alt="Tw" title="Twitter" width="32" height="32"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px">
                                        <img
                                          src="https://itjmcv.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png"
                                          alt="Ig" title="Instagram" width="32" height="32"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img
                                          src="https://itjmcv.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png"
                                          alt="Yt" title="Youtube" width="32" height="32"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img
                                          src="https://itjmcv.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png"
                                          alt="In" title="Linkedin" width="32" height="32"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <tr style="border-collapse:collapse">
                    <td
                      style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top"
                      align="left">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666">
                                    Contact us: <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666"
                                      href="tel:123456789">123456789</a> | <a target="_blank"
                                      href="mailto:your@mail.com"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666">your@mail.com</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-footer" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center">
                <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                  <tr style="border-collapse:collapse">
                    <td
                      style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;background-color:#CEFDC5"
                      bgcolor="#cefdc5" align="left">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                  <h2
                                    style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#666666">
                                    <strong>Have quastions?</strong></h2>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666">
                                    We are here to help, learn more about us <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#333333"
                                      href="">here</a></p>
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666">
                                    or <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#333333"
                                      href="">contact us</a></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="transparent" align="center">
                  <tr style="border-collapse:collapse">
                    <td style="padding:0;Margin:0;padding-top:15px;background-position:left top" align="left">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0">
                                  <table class="es-menu" width="100%" cellspacing="0" cellpadding="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr class="links" style="border-collapse:collapse">
                                      <td
                                        style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:1px;border:0"
                                        id="esd-menu-id-0" width="33.33%" valign="top" bgcolor="transparent"
                                        align="center"><a target="_blank" href="https://viewstripo.email"
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;display:block;color:#3D5CA3">Sing
                                          up</a></td>
                                      <td
                                        style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:1px;border:0;border-left:1px solid #3D5CA3"
                                        id="esd-menu-id-1" esdev-border-color="#3d5ca3" width="33.33%" valign="top"
                                        bgcolor="transparent" align="center">
                                        <a target="_blank" href="https://viewstripo.email"
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;display:block;color:#3D5CA3">Blog</a>
                                      </td>
                                      <td
                                        style="Margin:0;padding-left:5px;padding-right:5px;padding-top:0px;padding-bottom:1px;border:0;border-left:1px solid #3D5CA3"
                                        id="esd-menu-id-2" esdev-border-color="#3d5ca3" width="33.33%" valign="top"
                                        bgcolor="transparent" align="center"><a target="_blank"
                                          href="https://viewstripo.email"
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;display:block;color:#3D5CA3">About
                                          us</a></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr style="border-collapse:collapse">
                                <td align="center"
                                  style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0">
                                  <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"
                                    role="presentation"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr style="border-collapse:collapse">
                                      <td
                                        style="padding:0;Margin:0;border-bottom:1px solid #FAFAFA;background:none;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-footer" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
              <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center">
                <table class="es-footer-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="transparent" align="center">
                  <tr style="border-collapse:collapse">
                    <td align="left"
                      style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:18px;color:#666666">
                                    This daily newsletter was sent to info@name.com from company name because you
                                    subscribed. If you would not like to receive this email <a target="_blank"
                                      style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:12px;text-decoration:underline;color:#333333"
                                      class="unsubscribe" href="">unsubscribe here</a>.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr style="border-collapse:collapse">
              <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                  <tr style="border-collapse:collapse">
                    <td align="left"
                      style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td class="es-infoblock made_with" align="center"
                                  style="padding:0;Margin:0;line-height:0px;font-size:0px;color:#CCCCCC"><a
                                    target="_blank"
                                    href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=education&utm_content=trigger_newsletter2"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:12px;text-decoration:none;color:#CCCCCC"><img
                                      src="https://itjmcv.stripocdn.email/content/guids/CABINET_1018e16b6a7d1a1d652ba0eed8d9a849/images/33021595598628661.png"
                                      alt
                                      style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                      width="60" height="60"></a></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`;
  return data;
}

module.exports = emailTemplate;
