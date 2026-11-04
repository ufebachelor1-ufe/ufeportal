import { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { supabase2 } from "../supabase2";
import * as THREE from "three";

// --- Logo (inlined, used for the turning band) ---
const LOGO_SVG = `<svg width="318" height="48" viewBox="0 0 318 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12202_59266)">
<path d="M13.0423 35.9696C12.992 35.9539 12.8695 35.8816 12.769 35.8031C12.3606 35.4952 11.8046 35.2502 11.1009 35.0617C10.4349 34.8858 9.87891 34.8135 9.00561 34.7853L8.34277 34.7664L9.31346 31.8762C9.8475 30.2866 10.2842 28.9798 10.2842 28.9735C10.2842 28.9672 13.9313 28.9641 18.3921 28.9641H26.5L26.4843 29.8374C26.4717 30.6322 26.4623 30.7359 26.3901 31.0375C26.0508 32.4386 25.1838 33.5695 23.9429 34.2229C23.4843 34.4648 23.2141 34.5622 22.5387 34.7193C22.4445 34.7413 21.411 34.7601 19.5984 34.7758C17.2298 34.7947 16.746 34.8073 16.4413 34.8512C15.3418 35.0115 14.3051 35.3696 13.7585 35.7748C13.4758 35.9885 13.2779 36.0419 13.0423 35.9696Z" fill="#0045E7"/>
<path d="M4.17355 34.7413C3.8814 34.7036 3.43533 34.5967 3.18087 34.5056C2.61543 34.3046 1.91804 33.8742 1.47825 33.4627C0.862542 32.8815 0.359923 32.0207 0.152592 31.1945C0.0332201 30.7107 0.0112305 30.4846 0.0112305 29.7055V28.9641H3.51072H7.01335L6.46989 30.5757C6.17146 31.4584 5.73167 32.7684 5.49292 33.4815L5.05627 34.7758L4.71072 34.7727C4.5191 34.7695 4.27721 34.757 4.17355 34.7413Z" fill="#0045E7"/>
<path d="M0.0274018 25.7283C0.0179777 25.7126 0.00227086 21.2235 0.011695 20.7742C0.011695 20.7428 1.01065 20.7334 4.89339 20.7334H9.77822L8.94262 23.2246C8.48084 24.5911 8.10073 25.7189 8.09445 25.7283C8.07246 25.7535 0.0431087 25.7535 0.0274018 25.7283Z" fill="#0045E7"/>
<path d="M11.4166 25.7284C11.3946 25.7158 11.7056 24.7514 12.2208 23.2215L13.0564 20.7334H19.7727H26.4922V23.2309C26.4922 25.2037 26.4827 25.7284 26.4545 25.7347C26.3288 25.7504 11.4418 25.7472 11.4166 25.7284Z" fill="#0045E7"/>
<path d="M0.0258896 17.5085C0.00389984 17.4991 -0.00238295 16.5661 0.000758446 14.7723C0.00704123 13.2706 0.0101826 12.036 0.0101826 12.0203C0.0101826 12.0078 2.60183 12.0015 5.76835 12.0046L11.5234 12.014L11.7087 12.1083C12.0417 12.2811 12.2616 12.6141 12.2867 12.9942L12.3024 13.2172L11.5862 15.3503C11.1904 16.5221 10.8543 17.4897 10.8354 17.5022C10.8009 17.5274 0.0824346 17.5336 0.0258896 17.5085Z" fill="#0045E7"/>
<path d="M14.1668 17.5039C14.1448 17.4662 15.2946 14.0608 15.4171 13.8032C15.4768 13.6776 15.5773 13.4953 15.6401 13.3948C15.7909 13.1592 16.1804 12.7571 16.4286 12.578C16.6799 12.399 17.1511 12.1759 17.4621 12.088L17.7134 12.0157L22.1051 12.0063L26.4936 12V14.7645V17.529H20.3396C16.9532 17.529 14.1762 17.5165 14.1668 17.5039Z" fill="#0045E7"/>
<path d="M46.7567 35.8976C43.5721 35.5625 41.1175 34.494 39.2652 32.6466C38.0425 31.4151 37.2121 29.8575 36.7741 27.983C36.5916 27.2043 36.5825 26.8511 36.5277 19.67C36.5004 15.5498 36.4912 12.1358 36.5095 12.0906C36.5277 12.0362 37.6957 12 39.7306 12C43.125 12 43.3075 12.0181 43.6907 12.4528C43.8732 12.652 43.8732 12.815 43.9189 19.507C43.9736 26.181 43.9827 26.3711 44.1743 27.0594C44.8131 29.3414 46.3917 30.4733 48.9375 30.4733C51.4195 30.4733 52.9889 29.3866 53.655 27.2133C53.7919 26.7786 53.8193 25.8821 53.8558 19.7878C53.9197 12.1177 53.8832 12.4981 54.5219 12.1721C54.8413 12.0091 55.0876 12 58.0623 12H61.256V18.8822C61.256 23.0749 61.2195 26.1176 61.1648 26.6519C60.7724 30.2469 58.8836 33.0451 55.8268 34.5664C53.4999 35.7346 50.0416 36.2326 46.7567 35.8976Z" fill="#0045E7"/>
<path d="M66.5115 26.1852C66.5115 15.6536 66.4841 16.1517 67.0772 14.9382C67.4604 14.1414 68.4459 13.1724 69.2672 12.783C70.4443 12.2125 70.3348 12.2216 79.1493 12.2397L87.1427 12.2669L87.1336 14.4311C87.1336 16.1788 87.0971 16.6407 86.9876 16.858C86.7138 17.3832 86.7595 17.3832 80.582 17.3832C76.7495 17.3832 74.8424 17.4104 74.6508 17.4828C74.4957 17.5372 74.2767 17.7183 74.1763 17.8813C74.0029 18.153 73.9938 18.325 73.9938 20.3625V22.5449H85.5915L85.5367 27.0727L85.2356 27.3624L84.9436 27.6613L79.4687 27.6884L74.0029 27.7065L73.9756 31.3559C73.9482 34.797 73.9391 35.0144 73.7657 35.2589C73.4372 35.7479 73.2912 35.766 69.7508 35.766H66.5115V26.1852Z" fill="#0045E7"/>
<path d="M96.5278 35.6816C94.8124 35.3828 93.3068 34.1331 92.668 32.4669L92.4673 31.9236L92.4216 22.1617C92.3943 16.8008 92.3943 12.3636 92.4034 12.3184C92.4308 12.255 95.9621 12.2278 102.742 12.2278H113.053L112.998 16.7556L112.697 17.0453L112.405 17.3442L106.136 17.3713C101.3 17.3895 99.8493 17.4166 99.7945 17.5072C99.7124 17.634 99.6941 20.8668 99.7763 21.1747L99.831 21.3739H111.493L111.474 23.8461L111.447 26.3092L105.589 26.3363L99.7306 26.3544V27.9663C99.7306 29.7322 99.7945 30.0763 100.205 30.3751C100.461 30.5653 100.552 30.5653 106.666 30.6105L112.88 30.6558L113.19 30.9909L113.5 31.335V35.7722L105.224 35.7631C100.661 35.7541 96.7559 35.7179 96.5278 35.6816Z" fill="#0045E7"/>
<rect x="129.5" y="13" width="1" height="22" fill="#D9D9D9"/>
<path d="M151.564 21.096C150.924 21.096 150.332 20.992 149.788 20.784C149.252 20.568 148.784 20.268 148.384 19.884C147.992 19.492 147.684 19.036 147.46 18.516C147.236 17.996 147.124 17.424 147.124 16.8C147.124 16.176 147.236 15.604 147.46 15.084C147.684 14.564 147.996 14.112 148.396 13.728C148.796 13.336 149.264 13.036 149.8 12.828C150.344 12.612 150.936 12.504 151.576 12.504C152.224 12.504 152.82 12.616 153.364 12.84C153.916 13.056 154.384 13.38 154.768 13.812L153.988 14.568C153.668 14.232 153.308 13.984 152.908 13.824C152.508 13.656 152.08 13.572 151.624 13.572C151.152 13.572 150.712 13.652 150.304 13.812C149.904 13.972 149.556 14.196 149.26 14.484C148.964 14.772 148.732 15.116 148.564 15.516C148.404 15.908 148.324 16.336 148.324 16.8C148.324 17.264 148.404 17.696 148.564 18.096C148.732 18.488 148.964 18.828 149.26 19.116C149.556 19.404 149.904 19.628 150.304 19.788C150.712 19.948 151.152 20.028 151.624 20.028C152.08 20.028 152.508 19.948 152.908 19.788C153.308 19.62 153.668 19.364 153.988 19.02L154.768 19.776C154.384 20.208 153.916 20.536 153.364 20.76C152.82 20.984 152.22 21.096 151.564 21.096ZM155.058 21L158.862 12.6H160.05L163.866 21H162.606L159.21 13.272H159.69L156.294 21H155.058ZM156.678 18.9L157.002 17.94H161.73L162.078 18.9H156.678ZM171.34 12.6H172.54V21H171.34V12.6ZM166.516 21H165.316V12.6H166.516V21ZM171.448 17.256H166.396V16.212H171.448V17.256ZM174.26 12.6H175.64L177.836 15.672L180.032 12.6H181.436L178.592 16.632L181.664 21H180.248L177.836 17.652L175.436 21H174.056L177.116 16.68L174.26 12.6ZM184.912 21V17.784L185.188 18.528L181.588 12.6H182.86L185.896 17.604H185.2L188.248 12.6H189.436L185.836 18.528L186.1 17.784V21H184.912ZM192.916 21V17.784L193.192 18.528L189.592 12.6H190.864L193.9 17.604H193.204L196.252 12.6H197.44L193.84 18.528L194.104 17.784V21H192.916ZM203.278 17.22V16.236H207.778V17.22H203.278ZM204.358 12.504C204.966 12.504 205.526 12.612 206.038 12.828C206.55 13.036 206.994 13.336 207.37 13.728C207.754 14.112 208.05 14.564 208.258 15.084C208.474 15.604 208.582 16.176 208.582 16.8C208.582 17.424 208.474 17.996 208.258 18.516C208.05 19.036 207.754 19.492 207.37 19.884C206.994 20.268 206.55 20.568 206.038 20.784C205.526 20.992 204.966 21.096 204.358 21.096C203.686 21.096 203.066 20.984 202.498 20.76C201.938 20.536 201.466 20.208 201.082 19.776L201.838 19.02C202.174 19.364 202.546 19.616 202.954 19.776C203.37 19.936 203.818 20.016 204.298 20.016C204.738 20.016 205.146 19.936 205.522 19.776C205.898 19.616 206.222 19.396 206.494 19.116C206.774 18.828 206.99 18.488 207.142 18.096C207.294 17.696 207.37 17.264 207.37 16.8C207.37 16.336 207.294 15.908 207.142 15.516C206.99 15.116 206.774 14.776 206.494 14.496C206.222 14.208 205.898 13.984 205.522 13.824C205.146 13.664 204.738 13.584 204.298 13.584C203.818 13.584 203.37 13.664 202.954 13.824C202.546 13.984 202.174 14.236 201.838 14.58L201.082 13.824C201.466 13.392 201.938 13.064 202.498 12.84C203.066 12.616 203.686 12.504 204.358 12.504ZM215.872 20.436V13.644H212.188L212.128 15.408C212.104 16 212.064 16.568 212.008 17.112C211.96 17.656 211.888 18.148 211.792 18.588C211.696 19.02 211.56 19.376 211.384 19.656C211.216 19.936 211 20.108 210.736 20.172L209.44 19.956C209.752 19.98 210.008 19.876 210.208 19.644C210.416 19.404 210.576 19.072 210.688 18.648C210.808 18.216 210.896 17.716 210.952 17.148C211.008 16.572 211.048 15.956 211.072 15.3L211.156 12.6H217.06V20.436H215.872ZM209.14 22.836L209.152 19.956H218.296V22.836H217.18V21H210.268L210.256 22.836H209.14ZM219.937 21V12.6H221.125V19.08L226.093 12.6H227.197V21H226.021V14.532L221.041 21H219.937ZM229.816 21V12.6H231.004V19.08L235.972 12.6H237.076V21H235.9V14.532L230.92 21H229.816ZM233.428 12.012C232.772 12.012 232.264 11.868 231.904 11.58C231.552 11.292 231.372 10.888 231.364 10.368H232.216C232.224 10.68 232.336 10.924 232.552 11.1C232.768 11.268 233.06 11.352 233.428 11.352C233.788 11.352 234.076 11.268 234.292 11.1C234.516 10.924 234.632 10.68 234.64 10.368H235.48C235.472 10.888 235.288 11.292 234.928 11.58C234.576 11.868 234.076 12.012 233.428 12.012ZM245.719 12.6H246.919V21H245.719V12.6ZM240.895 21H239.695V12.6H240.895V21ZM245.827 17.256H240.775V16.212H245.827V17.256ZM251.837 20.088L252.257 19.2C252.625 19.488 253.029 19.704 253.469 19.848C253.917 19.992 254.361 20.068 254.801 20.076C255.241 20.076 255.645 20.016 256.013 19.896C256.389 19.776 256.689 19.596 256.913 19.356C257.137 19.116 257.249 18.82 257.249 18.468C257.249 18.036 257.073 17.708 256.721 17.484C256.377 17.26 255.897 17.148 255.281 17.148H253.409V16.176H255.197C255.733 16.176 256.149 16.068 256.445 15.852C256.749 15.628 256.901 15.32 256.901 14.928C256.901 14.632 256.809 14.384 256.625 14.184C256.449 13.976 256.205 13.82 255.893 13.716C255.589 13.612 255.241 13.56 254.849 13.56C254.465 13.552 254.069 13.604 253.661 13.716C253.253 13.82 252.861 13.988 252.485 14.22L252.101 13.236C252.613 12.948 253.145 12.748 253.697 12.636C254.257 12.516 254.797 12.48 255.317 12.528C255.837 12.568 256.305 12.688 256.721 12.888C257.145 13.08 257.481 13.336 257.729 13.656C257.985 13.968 258.113 14.344 258.113 14.784C258.113 15.184 258.009 15.54 257.801 15.852C257.593 16.156 257.305 16.392 256.937 16.56C256.569 16.72 256.141 16.8 255.653 16.8L255.701 16.476C256.261 16.476 256.745 16.568 257.153 16.752C257.569 16.928 257.889 17.18 258.113 17.508C258.345 17.836 258.461 18.216 258.461 18.648C258.461 19.056 258.357 19.42 258.149 19.74C257.941 20.052 257.657 20.316 257.297 20.532C256.945 20.74 256.541 20.892 256.085 20.988C255.637 21.084 255.165 21.116 254.669 21.084C254.173 21.052 253.681 20.956 253.193 20.796C252.713 20.636 252.261 20.4 251.837 20.088ZM259.296 21L263.1 12.6H264.288L268.104 21H266.844L263.448 13.272H263.928L260.532 21H259.296ZM260.916 18.9L261.24 17.94H265.968L266.316 18.9H260.916ZM273.193 21.096C272.553 21.096 271.961 20.992 271.417 20.784C270.881 20.568 270.413 20.268 270.013 19.884C269.621 19.492 269.313 19.036 269.089 18.516C268.865 17.996 268.753 17.424 268.753 16.8C268.753 16.176 268.865 15.604 269.089 15.084C269.313 14.564 269.625 14.112 270.025 13.728C270.425 13.336 270.893 13.036 271.429 12.828C271.973 12.612 272.565 12.504 273.205 12.504C273.853 12.504 274.449 12.616 274.993 12.84C275.545 13.056 276.013 13.38 276.397 13.812L275.617 14.568C275.297 14.232 274.937 13.984 274.537 13.824C274.137 13.656 273.709 13.572 273.253 13.572C272.781 13.572 272.341 13.652 271.933 13.812C271.533 13.972 271.185 14.196 270.889 14.484C270.593 14.772 270.361 15.116 270.193 15.516C270.033 15.908 269.953 16.336 269.953 16.8C269.953 17.264 270.033 17.696 270.193 18.096C270.361 18.488 270.593 18.828 270.889 19.116C271.185 19.404 271.533 19.628 271.933 19.788C272.341 19.948 272.781 20.028 273.253 20.028C273.709 20.028 274.137 19.948 274.537 19.788C274.937 19.62 275.297 19.364 275.617 19.02L276.397 19.776C276.013 20.208 275.545 20.536 274.993 20.76C274.449 20.984 273.849 21.096 273.193 21.096ZM278.05 21V12.6H283.558L283.546 13.644H278.938L279.226 13.344L279.238 21H278.05ZM284.988 21V12.6H286.176V19.08L291.144 12.6H292.248V21H291.072V14.532L286.092 21H284.988ZM294.867 21V12.6H296.055V19.08L301.023 12.6H302.127V21H300.951V14.532L295.971 21H294.867ZM298.479 12.012C297.823 12.012 297.315 11.868 296.955 11.58C296.603 11.292 296.423 10.888 296.415 10.368H297.267C297.275 10.68 297.387 10.924 297.603 11.1C297.819 11.268 298.111 11.352 298.479 11.352C298.839 11.352 299.127 11.268 299.343 11.1C299.567 10.924 299.683 10.68 299.691 10.368H300.531C300.523 10.888 300.339 11.292 299.979 11.58C299.627 11.868 299.127 12.012 298.479 12.012ZM310.77 12.6H311.97V21H310.77V12.6ZM305.946 21H304.746V12.6H305.946V21ZM310.878 17.256H305.826V16.212H310.878V17.256ZM147.808 36V27.6H148.996V34.08L153.964 27.6H155.068V36H153.892V29.532L148.912 36H147.808ZM156.787 27.6H158.167L160.363 30.672L162.559 27.6H163.963L161.119 31.632L164.191 36H162.775L160.363 32.652L157.963 36H156.583L159.643 31.68L156.787 27.6ZM172.681 36.096C172.041 36.096 171.449 35.992 170.905 35.784C170.369 35.568 169.901 35.268 169.501 34.884C169.109 34.492 168.801 34.036 168.577 33.516C168.353 32.996 168.241 32.424 168.241 31.8C168.241 31.176 168.353 30.604 168.577 30.084C168.801 29.564 169.113 29.112 169.513 28.728C169.913 28.336 170.381 28.036 170.917 27.828C171.461 27.612 172.053 27.504 172.693 27.504C173.341 27.504 173.937 27.616 174.481 27.84C175.033 28.056 175.501 28.38 175.885 28.812L175.105 29.568C174.785 29.232 174.425 28.984 174.025 28.824C173.625 28.656 173.197 28.572 172.741 28.572C172.269 28.572 171.829 28.652 171.421 28.812C171.021 28.972 170.673 29.196 170.377 29.484C170.081 29.772 169.849 30.116 169.681 30.516C169.521 30.908 169.441 31.336 169.441 31.8C169.441 32.264 169.521 32.696 169.681 33.096C169.849 33.488 170.081 33.828 170.377 34.116C170.673 34.404 171.021 34.628 171.421 34.788C171.829 34.948 172.269 35.028 172.741 35.028C173.197 35.028 173.625 34.948 174.025 34.788C174.425 34.62 174.785 34.364 175.105 34.02L175.885 34.776C175.501 35.208 175.033 35.536 174.481 35.76C173.937 35.984 173.337 36.096 172.681 36.096ZM177.315 34.944C177.731 35.096 178.115 35.136 178.467 35.064C178.819 34.984 179.135 34.716 179.415 34.26L179.823 33.612L179.943 33.48L183.027 27.6H184.215L180.483 34.512C180.203 35.04 179.875 35.44 179.499 35.712C179.131 35.976 178.731 36.12 178.299 36.144C177.875 36.176 177.443 36.096 177.003 35.904L177.315 34.944ZM179.907 34.548L176.223 27.6H177.507L180.567 33.588L179.907 34.548ZM185.46 36V27.6H188.736C189.472 27.6 190.1 27.716 190.62 27.948C191.14 28.18 191.54 28.516 191.82 28.956C192.1 29.396 192.24 29.92 192.24 30.528C192.24 31.136 192.1 31.66 191.82 32.1C191.54 32.532 191.14 32.868 190.62 33.108C190.1 33.34 189.472 33.456 188.736 33.456H186.12L186.66 32.892V36H185.46ZM186.66 33.012L186.12 32.412H188.7C189.468 32.412 190.048 32.248 190.44 31.92C190.84 31.592 191.04 31.128 191.04 30.528C191.04 29.928 190.84 29.464 190.44 29.136C190.048 28.808 189.468 28.644 188.7 28.644H186.12L186.66 28.044V33.012ZM193.91 36V27.6H199.418L199.406 28.644H194.798L195.086 28.344L195.098 36H193.91ZM200.823 34.944C201.239 35.096 201.623 35.136 201.975 35.064C202.327 34.984 202.643 34.716 202.923 34.26L203.331 33.612L203.451 33.48L206.535 27.6H207.723L203.991 34.512C203.711 35.04 203.383 35.44 203.007 35.712C202.639 35.976 202.239 36.12 201.807 36.144C201.383 36.176 200.951 36.096 200.511 35.904L200.823 34.944ZM203.415 34.548L199.731 27.6H201.015L204.075 33.588L203.415 34.548ZM208.85 34.944C209.266 35.096 209.65 35.136 210.002 35.064C210.354 34.984 210.67 34.716 210.95 34.26L211.358 33.612L211.478 33.48L214.562 27.6H215.75L212.018 34.512C211.738 35.04 211.41 35.44 211.034 35.712C210.666 35.976 210.266 36.12 209.834 36.144C209.41 36.176 208.978 36.096 208.538 35.904L208.85 34.944ZM211.442 34.548L207.758 27.6H209.042L212.102 33.588L211.442 34.548ZM216.506 36.096C216.386 36.096 216.266 36.088 216.146 36.072C216.026 36.056 215.894 36.032 215.75 36L215.834 34.932C215.962 34.964 216.09 34.98 216.218 34.98C216.57 34.98 216.85 34.84 217.058 34.56C217.266 34.28 217.418 33.856 217.514 33.288C217.618 32.72 217.686 32.004 217.718 31.14L217.85 27.6H223.766V36H222.59V28.332L222.878 28.644H218.618L218.882 28.32L218.786 31.104C218.762 31.936 218.706 32.664 218.618 33.288C218.53 33.912 218.398 34.432 218.222 34.848C218.046 35.264 217.818 35.576 217.538 35.784C217.266 35.992 216.922 36.096 216.506 36.096ZM230.066 30.528C231.058 30.528 231.822 30.752 232.358 31.2C232.894 31.64 233.162 32.3 233.162 33.18C233.162 34.108 232.87 34.812 232.286 35.292C231.71 35.764 230.898 36 229.85 36H226.382V27.6H227.57V30.528H230.066ZM229.802 35.052C230.498 35.052 231.03 34.896 231.398 34.584C231.774 34.272 231.962 33.812 231.962 33.204C231.962 32.612 231.778 32.176 231.41 31.896C231.042 31.616 230.506 31.476 229.802 31.476H227.57V35.052H229.802Z" fill="#0045E7"/>
</g>
<defs>
<clipPath id="clip0_12202_59266">
<rect width="317.5" height="48" fill="white"/>
</clipPath>
</defs>
</svg>`;

const LOGO_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG)}`;
const LOGO_W = 318;
const LOGO_H = 48;
const LOGO_SCALE = 4; // 4x the viewBox keeps the texture sharp

// Mongolian -> English
const COUNTRY_NAME_MAP = {
  "Монгол": "Mongolia",
  "Монгол улс": "Mongolia",
  "ОХУ": "Russia",
  "Япон": "Japan",
  "Япон улс": "Japan",
  "БНСУ": "South Korea",
  "БНХАУ": "China",
  "АНУ": "United States",
  "Герман": "Germany",
  "Австрали": "Australia",
  "Канад улс": "Canada",
  "Финланд улс": "Finland",
  "Швейцар улс": "Switzerland",
  "Тайвань улс": "Taiwan",
  "Канад": "Canada",
  "Солонгос": "South Korea",
  "Хятад": "China",
  "Тайвань": "Taiwan",
  "Финланд": "Finland",
  "Швейцарь": "Switzerland",
  "Их Британи": "United Kingdom",
};

const COUNTRY_COORDS = {
  Mongolia: { lat: 46.86, lng: 103.85 },
  Russia: { lat: 61.52, lng: 105.31 },
  Japan: { lat: 36.2, lng: 138.25 },
  "South Korea": { lat: 36.5, lng: 127.9 },
  China: { lat: 35.9, lng: 104.2 },
  "United States": { lat: 39.8, lng: -98.6 },
  Germany: { lat: 51.1, lng: 10.4 },
  Australia: { lat: -25.3, lng: 133.8 },
  Canada: { lat: 56.13, lng: -106.34 },
  Finland: { lat: 61.92, lng: 25.75 },
  Switzerland: { lat: 46.82, lng: 8.23 },
  Taiwan: { lat: 23.7, lng: 121.0 },
  "United Kingdom": { lat: 55.38, lng: -3.44 },
};

const FLAG_CODES = {
  Mongolia: "mn",
  Russia: "ru",
  Japan: "jp",
  "South Korea": "kr",
  China: "cn",
  "United States": "us",
  Germany: "de",
  Australia: "au",
  Canada: "ca",
  Finland: "fi",
  Switzerland: "ch",
  Taiwan: "tw",
  "United Kingdom": "gb",
};

const getFlagCode = (country) => FLAG_CODES[country] || "un";

// --- Elegant Ring / Logo Band Builder ---
const BAND_RADIUS = 122;
const BAND_REPEAT = 4;
// Height from the logo aspect ratio so each repeat is not stretched
const BAND_HEIGHT = ((2 * Math.PI * BAND_RADIUS) / BAND_REPEAT) * (LOGO_H / LOGO_W);
const noRaycast = () => {};

// Returns { group, spinner }: group carries the orbit tilt, spinner turns around its own axis
function buildElegantRings() {
  const group = new THREE.Group();
  group.rotation.x = 0.32;
  group.rotation.z = -0.12;

  const spinner = new THREE.Group();
  group.add(spinner);

  // Thin gold rings just above and below the band
  [BAND_HEIGHT / 2 + 2, -(BAND_HEIGHT / 2 + 2)].forEach((y, i) => {
    const geo = new THREE.RingGeometry(BAND_RADIUS - 0.5, BAND_RADIUS + 0.7, 256);
    const mat = new THREE.MeshBasicMaterial({
      color: i === 0 ? 0xf0a500 : 0xe8c96a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: i === 0 ? 0.4 : 0.25,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = y;
    mesh.raycast = noRaycast;
    spinner.add(mesh);
  });

  // Subtle tick marks, laid flat on the band plane and pointing outward
  const tickCount = 48;
  const tickRadius = 130;
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2;
    const isLarge = i % 8 === 0;
    const tickGeo = new THREE.BoxGeometry(
      isLarge ? 1.2 : 0.5,
      0.15,
      isLarge ? 4 : 1.8
    );
    const tickMat = new THREE.MeshBasicMaterial({
      color: isLarge ? 0xf0a500 : 0x4f86c6,
      transparent: true,
      opacity: isLarge ? 0.6 : 0.3,
      depthWrite: false,
    });
    const tick = new THREE.Mesh(tickGeo, tickMat);
    tick.position.set(Math.cos(angle) * tickRadius, 0, Math.sin(angle) * tickRadius);
    tick.rotation.y = Math.PI / 2 - angle;
    tick.raycast = noRaycast;
    spinner.add(tick);
  }

  return { group, spinner };
}

// Draws the logo recolored for the dark background; resolves null if it fails to load
function loadLogoCanvas() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const w = LOGO_W * LOGO_SCALE;
        const h = LOGO_H * LOGO_SCALE;
        const pad = 8 * LOGO_SCALE; // room for the glow

        // Solid light-gold silhouette of the logo
        const tint = document.createElement("canvas");
        tint.width = w;
        tint.height = h;
        const tctx = tint.getContext("2d");
        tctx.drawImage(img, 0, 0, w, h);
        tctx.globalCompositeOperation = "source-in";
        tctx.fillStyle = "#e8c96a";
        tctx.fillRect(0, 0, w, h);

        // Final texture with a soft gold glow, transparent background
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.shadowColor = "#f0a500";
        ctx.shadowBlur = 6 * LOGO_SCALE;
        // Shrink slightly so the glow isn't clipped at the edges
        ctx.drawImage(tint, pad, pad * (h / w), w - pad * 2, h - pad * 2 * (h / w));
        resolve(canvas);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = LOGO_DATA_URI;
  });
}

function buildLogoBand(canvas, renderer) {
  const makeTexture = (repeatX) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer?.capabilities?.getMaxAnisotropy?.() || 1;
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.x = repeatX;
    tex.needsUpdate = true;
    return tex;
  };

  const geo = new THREE.CylinderGeometry(BAND_RADIUS, BAND_RADIUS, BAND_HEIGHT, 128, 1, true);
  const band = new THREE.Group();

  // Outside faces read normally; inside faces use a flipped repeat so text is never mirrored
  [
    { side: THREE.FrontSide, repeat: BAND_REPEAT, opacity: 0.85 },
    { side: THREE.BackSide, repeat: -BAND_REPEAT, opacity: 0.5 },
  ].forEach((cfg) => {
    const mat = new THREE.MeshBasicMaterial({
      map: makeTexture(cfg.repeat),
      transparent: true,
      opacity: cfg.opacity,
      depthWrite: false,
      side: cfg.side,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.raycast = noRaycast;
    band.add(mesh);
  });

  return band;
}

function disposeGroup(group) {
  group.parent?.remove(group);
  const geos = new Set();
  group.traverse((obj) => {
    if (!obj.isMesh) return;
    geos.add(obj.geometry);
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach((m) => {
      m.map?.dispose();
      m.dispose();
    });
  });
  geos.forEach((g) => g.dispose());
}

export default function ProgramsGlobePage() {
  const globeRef = useRef();
  const ringsRef = useRef(null); // { group, spinner }
  const controlsCleanupRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const selectedCountryRef = useRef("Mongolia");
  const handleCountryClickRef = useRef(null);
  const containerRef = useRef();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("Mongolia");
  const [globeSize, setGlobeSize] = useState({ width: 650, height: 650 });

  // Update globe size on resize (card resize, orientation change, browser zoom)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const width = el.offsetWidth || 650;
      const height = el.offsetHeight || width;
      setGlobeSize({ width, height });
      // Keep the canvas sharp if devicePixelRatio changed (zoom / moving screens)
      globeRef.current?.renderer()?.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    window.addEventListener("resize", updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [loading, countries.length]);

  // Fit globe + rings to the card: pull the camera back on portrait cards, and keep
  // enough margin that flag badges pass below the top label / above the bottom button
  const isSmall = globeSize.width < 420;
  useEffect(() => {
    if (!globeRef.current) return;
    const ratio = globeSize.height / globeSize.width;
    globeRef.current.pointOfView({ altitude: Math.max(2.5, 3 * ratio - 1) }, 0);
  }, [globeSize.width, globeSize.height]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase2.from("program_international").select("*");
        if (error) throw error;
        setPrograms(data || []);
        const initialFiltered = (data || []).filter(
          (p) => COUNTRY_NAME_MAP[p.country] === "Mongolia"
        );
        setFilteredPrograms(initialFiltered);
        const countryCountMap = {};
        data.forEach((p) => {
          const country = COUNTRY_NAME_MAP[p.country];
          if (!country || !COUNTRY_COORDS[country]) return;
          countryCountMap[country] = (countryCountMap[country] || 0) + 1;
        });
        const points = Object.entries(countryCountMap).map(([country, count]) => ({
          country,
          lat: COUNTRY_COORDS[country].lat,
          lng: COUNTRY_COORDS[country].lng,
          count,
        }));
        setCountries(points);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const shouldAutoRotate = (country) => country === "БҮГД" || country === "Mongolia";

  useEffect(() => {
    selectedCountryRef.current = selectedCountry;
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = shouldAutoRotate(selectedCountry);
  }, [selectedCountry]);

  // Turn the logo band slowly
  useEffect(() => {
    let frameId;
    const animate = () => {
      const spinner = ringsRef.current?.spinner;
      if (spinner) spinner.rotation.y += 0.003;
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // On unmount: detach control listeners and free all ring/band GPU resources
  useEffect(() => {
    return () => {
      clearTimeout(resumeTimerRef.current);
      controlsCleanupRef.current?.();
      controlsCleanupRef.current = null;
      if (ringsRef.current) {
        disposeGroup(ringsRef.current.group);
        ringsRef.current = null;
      }
    };
  }, []);

  const handleGlobeReady = () => {
    if (!globeRef.current) return;

    const renderer = globeRef.current.renderer();
    renderer?.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const controls = globeRef.current.controls();
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    // Pause auto-rotate while the user drags/zooms, resume ~2s after they stop
    controlsCleanupRef.current?.();
    const onStart = () => {
      clearTimeout(resumeTimerRef.current);
      controls.autoRotate = false;
    };
    const onEnd = () => {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        controls.autoRotate = shouldAutoRotate(selectedCountryRef.current);
      }, 2000);
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);
    controlsCleanupRef.current = () => {
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
    };

    const scene = globeRef.current.scene();
    // Guard against adding the group twice (StrictMode / re-mounts)
    if (ringsRef.current?.group.parent === scene) return;
    if (ringsRef.current) disposeGroup(ringsRef.current.group);

    const rings = buildElegantRings();
    scene.add(rings.group);
    ringsRef.current = rings;

    loadLogoCanvas().then((canvas) => {
      // Skip silently if the logo failed or the group was replaced/disposed meanwhile
      if (!canvas || ringsRef.current !== rings) return;
      rings.spinner.add(buildLogoBand(canvas, renderer));
    });
  };

  const filterPrograms = (country) => {
    let filtered = [...programs];
    if (country && country !== "БҮГД") {
      filtered = filtered.filter((p) => COUNTRY_NAME_MAP[p.country] === country);
    }
    setFilteredPrograms(filtered);
  };

  const handleCountryClick = (p) => {
    setSelectedCountry(p.country);
    filterPrograms(p.country);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: p.lat, lng: p.lng, altitude: 1.6 },
        700
      );
    }
  };

  const handleReset = () => {
    setSelectedCountry("БҮГД");
    filterPrograms("БҮГД");
  };

  // Always call the latest handler from the memoized flag nodes
  handleCountryClickRef.current = handleCountryClick;

  // Flag badges are only rebuilt when the selection or size class changes
  const renderFlag = useCallback(
    (d) => {
      const el = document.createElement("div");
      el.style.pointerEvents = "auto";
      el.style.transform = "translate(-50%, -50%)";
      el.style.zIndex = "5";
      el.style.padding = isSmall ? "2px" : "4px";
      el.style.borderRadius = "4px";
      el.style.boxShadow =
        d.country === selectedCountry
          ? "0 0 12px #f0a500, 0 0 24px rgba(240,165,0,0.4)"
          : "0 0 8px rgba(240,165,0,0.3)";
      el.style.border =
        d.country === selectedCountry
          ? "2px solid #f0a500"
          : "1px solid rgba(240,165,0,0.3)";
      el.style.background = "rgba(15,37,64,0.7)";
      el.style.backdropFilter = "blur(4px)";

      const img = document.createElement("img");
      img.src = `https://flagcdn.com/w40/${getFlagCode(d.country)}.png`;
      img.style.width = isSmall ? "22px" : "32px";
      img.style.height = isSmall ? "15px" : "22px";
      img.style.borderRadius = "2px";
      img.style.cursor = "pointer";
      img.style.display = "block";

      img.addEventListener("pointerdown", (e) => e.stopPropagation());
      img.addEventListener("click", () => handleCountryClickRef.current?.(d));
      el.appendChild(img);
      return el;
    },
    [selectedCountry, isSmall]
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-full bg-primary">
        <p className="text-third font-bold tracking-[0.15em]">
          АЧААЛЛАЖ БАЙНА...
        </p>
      </div>
    );

  if (!countries.length)
    return (
      <div className="flex items-center justify-center h-full bg-primary">
        <p className="text-third font-bold tracking-[0.15em]">
          ОДООГООР ЯМАР Ч УЛС АЛГА
        </p>
      </div>
    );

  return (
    <div className="relative w-full h-full bg-primary">
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');

        .elegant-select {
          background: rgba(240,165,0,0.08);
          border: 1px solid rgba(240,165,0,0.3);
          color: #e8c96a;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: 'Montserrat','DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          transition: all 0.2s;
        }
        .elegant-select:focus {
          border-color: #f0a500;
          box-shadow: 0 0 0 2px rgba(240,165,0,0.15);
        }
        .elegant-select option {
          background: #0a1929;
          color: #e8c96a;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          padding: 8px 18px;
          border-radius: 4px;
          font-family: 'Montserrat','DM Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .reset-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .program-card {
          position: relative;
          background: rgba(15,37,64,0.6);
          border: 1px solid rgba(240,165,0,0.15);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          min-height: 240px;
          backdrop-filter: blur(8px);
        }
        .program-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(240,165,0,0.05) 0%, rgba(79,134,198,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .program-card:hover {
          border-color: #f0a500;
          box-shadow: 0 8px 32px rgba(240,165,0,0.2);
          transform: translateY(-4px);
        }
        .program-card:hover::before {
          opacity: 1;
        }

        .program-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15,37,64,0.85);
          backdrop-filter: blur(4px);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .program-card:hover .program-overlay {
          opacity: 1;
        }

        .detail-btn {
          padding: 10px 24px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Montserrat','DM Mono', monospace;
          letter-spacing: 0.15em;
          background: #f0a500;
          color: #0f2540;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(240,165,0,0.3);
          transition: all 0.2s;
          text-decoration: none;
          text-transform: uppercase;
        }
        .detail-btn:hover {
          background: #fdb62c;
          box-shadow: 0 6px 24px rgba(240,165,0,0.5);
          transform: translateY(-1px);
        }

        .grid-texture {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.03);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(240,165,0,0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(240,165,0,0.5);
        }
      `}</style>

      
          
          {/* Globe container */}
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ touchAction: "pan-y" }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-third/20 shadow-2xl bg-gradient-radial from-[rgba(79,134,198,0.15)] to-[rgba(15,37,64,0.6)]">
              <Globe
                ref={globeRef}
                width={globeSize.width}
                height={globeSize.height}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                htmlElementsData={countries}
                htmlLat={(d) => d.lat}
                htmlLng={(d) => d.lng}
                htmlAltitude={() => 0.12}
                htmlElement={renderFlag}
                cameraPosition={{ lat: 20, lng: 0, altitude: 2.0 }}
                onGlobeReady={handleGlobeReady}
              />
            </div>
          </div>
    </div>
  );
}