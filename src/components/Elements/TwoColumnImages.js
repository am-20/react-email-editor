import { useState } from 'react';

export default function TwoColumnImages() {
  const [srcLeft, setSrcLeft] = useState();
  const [srcRight, setSrcRight] = useState();

  return (
    <table width='100%' cellPadding='0' cellSpacing='0'>
      <tbody>
        <tr>
          <td>
            <table width='100%' cellPadding='0' cellSpacing='0'>
              <tbody>
                <tr>
                  <td style={{ width: '50%' }}>
                    <img src={srcLeft} alt='Left' width='100%' />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setSrcLeft(URL.createObjectURL(file));
                      }}
                    />
                  </td>
                  <td style={{ width: '50%' }}>
                    <img src={srcRight} alt='Right' width='100%' />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setSrcRight(URL.createObjectURL(file));
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
