#include "stdafx.h"
#include "CCloud.h"
#include "CTestScene.h"
#include "CShaderManager.h"

#define TEXTURES 8

CCloud::CCloud(int nIndex, ID3D12Device* pd3dDevice, ID3D12GraphicsCommandList* pd3dCommandList, ID3D12RootSignature* pd3dGraphicsRootSignature, float fXPos, float fZPos, UINT nInstance, std::default_random_engine dre)
{
	m_nInstance = nInstance;

	VS_VB_BILLBOARD_INSTANCE* pInstanceInfos = new VS_VB_BILLBOARD_INSTANCE[m_nInstance];

	std::uniform_real_distribution<float>y(5000, 6000);
	std::uniform_real_distribution<float>range(1000, 3000);
	std::uniform_real_distribution<float>x(fXPos - range(dre), fXPos + range(dre));
	std::uniform_real_distribution<float>z(fZPos - range(dre) - 1000, fZPos + range(dre) - 1000);
	std::uniform_real_distribution<float>size(1, 2);
	float sizeTotal = size(dre);
	m_pPlaneMesh = new CPlaneMesh(pd3dDevice, pd3dCommandList, 1024 * sizeTotal, 768 * sizeTotal, 1, XMFLOAT2(0, 0), XMFLOAT2(0, 0), XMFLOAT2(0, 0), XMFLOAT2(0, 0));
	m_pPlaneMesh->SetAABB(XMFLOAT3(fXPos, 5500, fZPos), XMFLOAT3(3000, 600, 3000));
	SetMesh(m_pPlaneMesh);

	for (int i = 0; i < m_nInstance; ++i)
	{
		pInstanceInfos[i].m_xmf3Position = XMFLOAT3(x(dre), y(dre), z(dre));
	}
	m_pd3dInstancesBuffer = ::CreateBufferResource(pd3dDevice, pd3dCommandList, pInstanceInfos, sizeof(VS_VB_BILLBOARD_INSTANCE) * m_nInstance, 
		D3D12_HEAP_TYPE_DEFAULT, D3D12_RESOURCE_STATE_VERTEX_AND_CONSTANT_BUFFER, &m_pd3dInstanceUploadBuffer);

	m_d3dInstancingBufferView.BufferLocation = m_pd3dInstancesBuffer->GetGPUVirtualAddress();
	m_d3dInstancingBufferView.StrideInBytes = sizeof(VS_VB_BILLBOARD_INSTANCE);
	m_d3dInstancingBufferView.SizeInBytes = sizeof(VS_VB_BILLBOARD_INSTANCE) * m_nInstance;

	if (pInstanceInfos) delete[] pInstanceInfos;
}

CCloud::CCloud(ID3D12Device* pd3dDevice, ID3D12GraphicsCommandList* pd3dCommandList, ID3D12RootSignature* pd3dGraphicsRootSignature)
{
	m_pCloudTexture[0] = new CTexture(1, RESOURCE_TEXTURE2D , 0);
	m_pCloudTexture[0]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_1.dds", 0);
	m_pCloudTexture[1] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[1]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_2.dds", 0);
	m_pCloudTexture[2] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[2]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_3.dds", 0);
	m_pCloudTexture[3] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[3]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_4.dds", 0);
	m_pCloudTexture[4] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[4]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_5.dds", 0);
	m_pCloudTexture[5] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[5]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_6.dds", 0);
	m_pCloudTexture[6] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[6]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_7.dds", 0);
	m_pCloudTexture[7] = new CTexture(1, RESOURCE_TEXTURE2D, 0);
	m_pCloudTexture[7]->LoadTextureFromFile(pd3dDevice, pd3dCommandList, L"Effect/Cloud/cloud_8.dds", 0);

	m_pCloudShader = new CCloudShader();
	m_pCloudShader->CreateShader(pd3dDevice, pd3dCommandList, pd3dGraphicsRootSignature);
	for (int i = 0; i < TEXTURES; i++)CTestScene::CreateShaderResourceViews(pd3dDevice, m_pCloudTexture[i], 15, false);
}

CCloud::~CCloud()
{
	if (m_pd3dInstanceUploadBuffer) m_pd3dInstanceUploadBuffer->Release();
}

bool CCloud::IsVisible(CCamera* pCamera)
{
	bool bIsVisible = false;
	BoundingBox xmBoundingBox = m_pPlaneMesh->m_xmAABB;
	//모델 좌표계의 바운딩 박스를 월드 좌표계로 변환한다. xmBoundingBox.Transform(xmBoundingBox, XMLoadFloat4x4(&m_xmf4x4World));
	if (pCamera) bIsVisible = pCamera->IsInFrustum(xmBoundingBox);
	return(bIsVisible);
}

void CCloud::Animate(float fTimeElapsed)
{
	CPlayer* pPlayer = (CPlayer*)GET_MANAGER<ObjectManager>()->GetObjFromTag(L"player", OBJ_PLAYER);
	XMFLOAT3 xmf3Pos, xmf3PlayerPos, xmf3TargetVector;
	xmf3Pos = GetPosition();
	xmf3PlayerPos = GET_MANAGER<ObjectManager>()->GetObjFromTag(L"player", OBJ_PLAYER)->GetPosition();
	xmf3TargetVector = Vector3::Subtract(xmf3Pos, xmf3PlayerPos);
	XMFLOAT3 xmfAxis = Vector3::CrossProduct(pPlayer->GetLookVector(), xmf3TargetVector);
	LenthToPlayer = sqrt(xmf3TargetVector.x * xmf3TargetVector.x + xmf3TargetVector.y * xmf3TargetVector.x + xmf3TargetVector.z * xmf3TargetVector.z);
	//cout << LenthToPlayer << endl;
}

void CCloud::SetLookAt(XMFLOAT3& xmfTarget)
{
}

void CCloud::Render(ID3D12GraphicsCommandList* pd3dCommandList, CCamera* pCamera)
{
	if(LenthToPlayer < 40000)
	if (IsVisible(pCamera))
	{
		m_pCloudShader->Render(pd3dCommandList, pCamera);
		m_pCloudMaterial->m_ppTextures[0]->UpdateShaderVariables(pd3dCommandList);
		m_pPlaneMesh->Render(pd3dCommandList, m_d3dInstancingBufferView, m_nInstance);
	}
}
