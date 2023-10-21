{
  description = "This is a template to make amazing projects or other templates.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      systems = [ "aarch64-darwin" "x86_64-linux" "aarch64-linux" ];
    in
    flake-utils.lib.eachSystem systems (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodePkgs = pkgs.nodePackages;
      in
      rec {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_18
            nodePkgs.pnpm
          ];

          shellHook = ''
            echo
            echo "     [[[[[  WELCOME TO THE NEBULA  ]]]]]"
            echo "     ᚤᛟᚢ ᚨᚱᛖ ᛒᛖᚲᛟᛗᛁᚾᚷ ᛟᚾᛖ ᚹᛁᛏᚺ ᛏᚺᛖ ᛋᛏᚨᚱᛋ"
            echo "     [[[[[  •+-#—*#•-##++-*+-+••## ]]]]]"
            echo
          '';
        };
      }
    );
}
