import {
  IAddPublicKeyFields,
  IAddPublicKeyPayload,
  IPublicKeyRenderInfo,
} from "../../Interfaces/IPublicKey";
import { gql, useMutation } from "@apollo/client";
import { useRevokePublicKey } from "../../Contexts/UserContexts";

const REVOKE_PUBLIC_KEY_MUTATION = gql`
  mutation ($public_key_hash: String!, $public_key_encryption_type: String!) {
    revoke_public_key(
      public_key_hash: $public_key_hash
      public_key_encryption_type: $public_key_encryption_type
    ) {
      public_key_id
      public_key_hash
      public_key_encryption_type
    }
  }
`;

function Key({ info }: IPublicKeyRenderInfo) {
  const [revokeKey, { data, error, loading }] = useMutation<
    IAddPublicKeyPayload,
    IAddPublicKeyFields
  >(REVOKE_PUBLIC_KEY_MUTATION, {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });
  const revoke_public_key = useRevokePublicKey();

  return (
    <div className="notification is-link is-light public-key-list-item">
      <button
        className="delete"
        onClick={() => {
          revokeKey({
            variables: {
              public_key_hash: info.public_key_hash,
              public_key_encryption_type: info.public_key_encryption_type,
            },
          });

          if (revoke_public_key) revoke_public_key(info);
        }}
      ></button>
      {info.public_key_hash}
    </div>
  );
}

export default Key;
